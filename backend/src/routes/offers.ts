import { Router, Request, Response } from 'express';
import supabase from '../utils/supabase';
import { authenticate } from '../middleware/auth';
import { validateOffer } from '../middleware/validate';
import { AuthRequest, ApiResponse } from '../types';

const router = Router();

/**
 * GET /api/offers/manage
 * Admin – all offers.
 */
router.get('/manage', authenticate, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch offers.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Offers manage error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

/**
 * GET /api/offers
 * Public – list active offers only.
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Offers fetch error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch offers.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Offers error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

/**
 * POST /api/offers
 * Admin – create a new offer.
 */
router.post('/', authenticate, validateOffer, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const offerData = {
      title: req.body.title,
      description: req.body.description || null,
      discount_type: req.body.discount_type,
      discount_value:
        req.body.discount_value != null && req.body.discount_value !== ''
          ? parseFloat(req.body.discount_value)
          : null,
      valid_from: req.body.valid_from,
      valid_until: req.body.valid_until,
      banner_image: req.body.banner_image || null,
      product_ids: req.body.product_ids || req.body.products || [],
      active: req.body.active ?? true,
    };

    const { data, error } = await supabase
      .from('offers')
      .insert(offerData)
      .select()
      .single();

    if (error) {
      console.error('Offer create error:', error);
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    res.status(201).json({
      success: true,
      data,
      message: 'Offer created successfully.',
    } as ApiResponse);
  } catch (err) {
    console.error('Offer create error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

/**
 * PUT /api/offers/:id
 * Admin – update an offer.
 */
router.put('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const allowedFields = [
      'title', 'description', 'discount_type', 'discount_value',
      'valid_from', 'valid_until', 'banner_image', 'product_ids', 'active',
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const { data, error } = await supabase
      .from('offers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Offer update error:', error);
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    if (!data) {
      res.status(404).json({ success: false, error: 'Offer not found.' } as ApiResponse);
      return;
    }

    res.json({
      success: true,
      data,
      message: 'Offer updated successfully.',
    } as ApiResponse);
  } catch (err) {
    console.error('Offer update error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

/**
 * DELETE /api/offers/:id
 * Admin – delete an offer.
 */
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('offers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Offer delete error:', error);
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    res.json({
      success: true,
      message: 'Offer deleted successfully.',
    } as ApiResponse);
  } catch (err) {
    console.error('Offer delete error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

export default router;
