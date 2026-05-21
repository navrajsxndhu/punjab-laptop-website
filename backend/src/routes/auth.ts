import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import supabase from '../utils/supabase';
import { authenticate, generateToken, verifyToken } from '../middleware/auth';
import { validateLogin } from '../middleware/validate';
import { authLimiter } from '../middleware/rateLimiter';
import { AdminUser, AuthRequest, ApiResponse, AuthPayload } from '../types';

const router = Router();

/**
 * POST /api/auth/login
 * Authenticate admin user and return JWT token.
 */
router.post('/login', authLimiter, validateLogin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find admin user by email
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      } as ApiResponse);
      return;
    }

    const adminUser = user as AdminUser;

    // Compare password
    const isMatch = await bcrypt.compare(password, adminUser.password_hash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      } as ApiResponse);
      return;
    }

    // Generate JWT
    const payload: AuthPayload = {
      id: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
    };
    const token = generateToken(payload);

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
        },
      },
      message: 'Login successful.',
    } as ApiResponse);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error.',
    } as ApiResponse);
  }
});

/**
 * POST /api/auth/verify
 * Verify JWT token and return user info.
 */
router.post('/verify', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({ success: false, error: 'Unauthorized.' } as ApiResponse);
      return;
    }

    // Fetch fresh user data
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('id, email, name, role')
      .eq('id', req.admin.id)
      .single();

    if (error || !user) {
      res.status(401).json({
        success: false,
        error: 'User not found.',
      } as ApiResponse);
      return;
    }

    res.json({
      success: true,
      data: { user },
      message: 'Token is valid.',
    } as ApiResponse);
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error.',
    } as ApiResponse);
  }
});

/**
 * POST /api/auth/refresh
 * Issue a new JWT when the current token is still valid (session extension).
 */
router.post('/refresh', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({ success: false, error: 'Unauthorized.' } as ApiResponse);
      return;
    }

    const token = generateToken({
      id: req.admin.id,
      email: req.admin.email,
      role: req.admin.role,
    });

    res.json({
      success: true,
      data: { token },
      message: 'Token refreshed.',
    } as ApiResponse);
  } catch (err) {
    console.error('Refresh error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

export default router;
