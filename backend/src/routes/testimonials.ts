import { Router, Request, Response } from 'express';
import supabase from '../utils/supabase';
import { authenticate } from '../middleware/auth';
import { AuthRequest, ApiResponse } from '../types';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch testimonials.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Testimonials error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        name: req.body.name,
        rating: req.body.rating ?? 5,
        text: req.body.text,
        avatar_url: req.body.avatar_url || null,
        location: req.body.location || null,
        verified: req.body.verified ?? true,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    res.status(201).json({ success: true, data, message: 'Testimonial created.' } as ApiResponse);
  } catch (err) {
    console.error('Testimonial create error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const allowed = ['name', 'rating', 'text', 'avatar_url', 'location', 'verified'];
    const updateData: Record<string, unknown> = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    }

    const { data, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      res.status(error ? 400 : 404).json({
        success: false,
        error: error?.message || 'Testimonial not found.',
      } as ApiResponse);
      return;
    }

    res.json({ success: true, data, message: 'Testimonial updated.' } as ApiResponse);
  } catch (err) {
    console.error('Testimonial update error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error } = await supabase.from('testimonials').delete().eq('id', req.params.id);
    if (error) {
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }
    res.json({ success: true, message: 'Testimonial deleted.' } as ApiResponse);
  } catch (err) {
    console.error('Testimonial delete error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

export default router;


