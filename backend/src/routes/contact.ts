import { Router, Request, Response } from 'express';
import supabase from '../utils/supabase';
import { validateContact } from '../middleware/validate';
import { contactLimiter } from '../middleware/rateLimiter';
import { ApiResponse } from '../types';

const router = Router();

router.post('/', contactLimiter, validateContact, async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone || null,
        message: req.body.message,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    res.status(201).json({
      success: true,
      data,
      message: 'Thank you! We will get back to you soon.',
    } as ApiResponse);
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

export default router;


