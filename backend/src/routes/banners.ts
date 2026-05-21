import { Router, Request, Response } from 'express';
import supabase from '../utils/supabase';
import { authenticate } from '../middleware/auth';
import { AuthRequest, ApiResponse } from '../types';

const router = Router();

router.get('/manage', authenticate, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch banners.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Banners manage error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch banners.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Banners error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('banners')
      .insert({
        title: req.body.title || null,
        subtitle: req.body.subtitle || null,
        image_url: req.body.image_url,
        link: req.body.link || null,
        active: req.body.active ?? true,
        sort_order: req.body.sort_order ?? 0,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    res.status(201).json({ success: true, data, message: 'Banner created.' } as ApiResponse);
  } catch (err) {
    console.error('Banner create error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const allowed = ['title', 'subtitle', 'image_url', 'link', 'active', 'sort_order'];
    const updateData: Record<string, unknown> = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    }

    const { data, error } = await supabase
      .from('banners')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      res.status(error ? 400 : 404).json({
        success: false,
        error: error?.message || 'Banner not found.',
      } as ApiResponse);
      return;
    }

    res.json({ success: true, data, message: 'Banner updated.' } as ApiResponse);
  } catch (err) {
    console.error('Banner update error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error } = await supabase.from('banners').delete().eq('id', req.params.id);
    if (error) {
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }
    res.json({ success: true, message: 'Banner deleted.' } as ApiResponse);
  } catch (err) {
    console.error('Banner delete error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

export default router;
