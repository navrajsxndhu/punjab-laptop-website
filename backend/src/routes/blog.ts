import { Router, Request, Response } from 'express';
import supabase from '../utils/supabase';
import { authenticate } from '../middleware/auth';
import { validateBlogPost } from '../middleware/validate';
import { AuthRequest, ApiResponse } from '../types';

const router = Router();

router.get('/manage/post/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      res.status(404).json({ success: false, error: 'Blog post not found.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Blog post fetch error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

router.get('/manage', authenticate, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch blog posts.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Blog manage error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image, author, tags, published_at, created_at')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch blog posts.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Blog list error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', req.params.slug)
      .eq('published', true)
      .single();

    if (error || !data) {
      res.status(404).json({ success: false, error: 'Blog post not found.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Blog detail error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

router.post('/', authenticate, validateBlogPost, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        excerpt: req.body.excerpt || null,
        cover_image: req.body.cover_image || null,
        author: req.body.author || 'Punjab Laptop Sirsa',
        tags: req.body.tags || [],
        published: req.body.published ?? false,
        published_at: req.body.published ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    res.status(201).json({ success: true, data, message: 'Blog post created.' } as ApiResponse);
  } catch (err) {
    console.error('Blog create error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
    const fields = ['title', 'slug', 'content', 'excerpt', 'cover_image', 'author', 'tags', 'published'];
    for (const field of fields) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    }
    if (req.body.published === true && !req.body.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      res.status(error ? 400 : 404).json({
        success: false,
        error: error?.message || 'Blog post not found.',
      } as ApiResponse);
      return;
    }

    res.json({ success: true, data, message: 'Blog post updated.' } as ApiResponse);
  } catch (err) {
    console.error('Blog update error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error } = await supabase.from('blog_posts').delete().eq('id', req.params.id);
    if (error) {
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }
    res.json({ success: true, message: 'Blog post deleted.' } as ApiResponse);
  } catch (err) {
    console.error('Blog delete error:', err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : ((err as any)?.message || 'Internal server error.') } as ApiResponse);
  }
});

export default router;


