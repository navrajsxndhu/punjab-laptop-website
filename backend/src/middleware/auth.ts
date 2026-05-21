import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, AuthPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || '';

function requireJwtSecret(): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured on the server.');
  }
  return JWT_SECRET;
}

/**
 * JWT authentication middleware.
 * Extracts Bearer token from Authorization header, verifies it,
 * and attaches the decoded admin payload to req.admin.
 */
export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, requireJwtSecret()) as AuthPayload;
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token.',
    });
  }
}

/**
 * Generate a JWT token for an admin user.
 */
export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, requireJwtSecret(), { expiresIn: '24h' });
}

/**
 * Verify a JWT token and return the payload.
 */
export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, requireJwtSecret()) as AuthPayload;
}
