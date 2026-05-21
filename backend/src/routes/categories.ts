import { Router, Request, Response } from 'express';
import supabase from '../utils/supabase';
import { ApiResponse } from '../types';

const router = Router();

/**
 * GET /api/categories
 * Public – list all categories.
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Categories fetch error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch categories.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Categories error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

export default router;
