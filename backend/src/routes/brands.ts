import { Router, Request, Response } from 'express';
import supabase from '../utils/supabase';
import { ApiResponse } from '../types';

const router = Router();

/**
 * GET /api/brands
 * Public – list all brands.
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Brands fetch error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch brands.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Brands error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

export default router;


