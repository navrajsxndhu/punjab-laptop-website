import { Router, Request, Response } from 'express';
import supabase from '../utils/supabase';
import { ApiResponse } from '../types';

const router = Router();

/**
 * GET /api/testimonials
 * Public – list all verified testimonials.
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Testimonials fetch error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch testimonials.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Testimonials error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

export default router;
