import { Router, Response } from 'express';
import supabase from '../utils/supabase';
import { authenticate } from '../middleware/auth';
import { AuthRequest, ApiResponse } from '../types';

const router = Router();

router.use(authenticate);

router.get('/stats', async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [
      productsRes,
      inStockRes,
      inquiriesRes,
      unreadRes,
      offersRes,
      activeOffersRes,
      blogRes,
      publishedRes,
    ] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('products').select('id', { count: 'exact', head: true }).eq('in_stock', true),
      supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }),
      supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }).eq('read', false),
      supabase.from('offers').select('id', { count: 'exact', head: true }),
      supabase.from('offers').select('id', { count: 'exact', head: true }).eq('active', true),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('published', true),
    ]);

    res.json({
      success: true,
      data: {
        totalProducts: productsRes.count || 0,
        inStockProducts: inStockRes.count || 0,
        totalInquiries: inquiriesRes.count || 0,
        unreadInquiries: unreadRes.count || 0,
        totalOffers: offersRes.count || 0,
        activeOffers: activeOffersRes.count || 0,
        totalBlogPosts: blogRes.count || 0,
        publishedPosts: publishedRes.count || 0,
      },
    } as ApiResponse);
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

router.get('/inquiries', async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch inquiries.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Inquiries error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

router.get('/inquiries/recent', async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8);

    if (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch inquiries.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Recent inquiries error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

router.delete('/inquiries/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error } = await supabase.from('contact_inquiries').delete().eq('id', req.params.id);
    if (error) {
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }
    res.json({ success: true, message: 'Inquiry deleted.' } as ApiResponse);
  } catch (err) {
    console.error('Inquiry delete error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

router.patch('/inquiries/:id/read', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .update({ read: true })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      res.status(404).json({ success: false, error: 'Inquiry not found.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data, message: 'Marked as read.' } as ApiResponse);
  } catch (err) {
    console.error('Inquiry update error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

export default router;
