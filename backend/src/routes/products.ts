import { Router, Request, Response } from 'express';
import supabase from '../utils/supabase';
import { authenticate } from '../middleware/auth';
import { validateProduct } from '../middleware/validate';
import { AuthRequest, ApiResponse, ProductQueryParams } from '../types';

const router = Router();

/**
 * GET /api/products
 * Public – list products with filtering, sorting, and pagination.
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      brand,
      category,
      processor,
      ram,
      storage,
      minPrice,
      maxPrice,
      search,
      sort,
      page = '1',
      limit = '12',
      featured,
      in_stock,
    } = req.query as ProductQueryParams;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    // Build query
    let query = supabase
      .from('products')
      .select('*, brands(name, slug), categories(name, slug)', { count: 'exact' });

    // Filters
    if (brand) {
      // Allow filtering by brand slug
      const { data: brandData } = await supabase
        .from('brands')
        .select('id')
        .eq('slug', brand)
        .single();
      if (brandData) {
        query = query.eq('brand_id', brandData.id);
      }
    }
    if (category) {
      const { data: catData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single();
      if (catData) {
        query = query.eq('category_id', catData.id);
      }
    }
    if (processor) {
      query = query.ilike('processor', `%${processor}%`);
    }
    if (ram) {
      query = query.ilike('ram', `%${ram}%`);
    }
    if (storage) {
      query = query.ilike('storage', `%${storage}%`);
    }
    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice));
    }
    if (featured === 'true') {
      query = query.eq('featured', true);
    }
    if (in_stock === 'true') {
      query = query.eq('in_stock', true);
    } else if (in_stock === 'false') {
      query = query.eq('in_stock', false);
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,processor.ilike.%${search}%`);
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'name_asc':
        query = query.order('name', { ascending: true });
        break;
      case 'name_desc':
        query = query.order('name', { ascending: false });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Products fetch error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch products.' } as ApiResponse);
      return;
    }

    const total = count || 0;

    res.json({
      success: true,
      data,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    } as ApiResponse);
  } catch (err) {
    console.error('Products error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

/**
 * GET /api/products/:slug
 * Public – get a single product by slug.
 */
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const { data, error } = await supabase
      .from('products')
      .select('*, brands(name, slug, logo_url), categories(name, slug)')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      res.status(404).json({ success: false, error: 'Product not found.' } as ApiResponse);
      return;
    }

    res.json({ success: true, data } as ApiResponse);
  } catch (err) {
    console.error('Product detail error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

/**
 * POST /api/products
 * Admin – create a new product.
 */
router.post('/', authenticate, validateProduct, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const productData = {
      name: req.body.name,
      slug: req.body.slug,
      brand_id: req.body.brand_id,
      category_id: req.body.category_id,
      processor: req.body.processor || null,
      ram: req.body.ram || null,
      storage: req.body.storage || null,
      display_size: req.body.display_size || null,
      graphics: req.body.graphics || null,
      price: parseFloat(req.body.price),
      sale_price: req.body.sale_price ? parseFloat(req.body.sale_price) : null,
      images: req.body.images || [],
      specs: req.body.specs || null,
      in_stock: req.body.in_stock ?? true,
      featured: req.body.featured ?? false,
      warranty: req.body.warranty || null,
      description: req.body.description || null,
    };

    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) {
      console.error('Product create error:', error);
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    res.status(201).json({
      success: true,
      data,
      message: 'Product created successfully.',
    } as ApiResponse);
  } catch (err) {
    console.error('Product create error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

/**
 * PUT /api/products/:id
 * Admin – update a product.
 */
router.put('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Build update object from provided fields only
    const allowedFields = [
      'name', 'slug', 'brand_id', 'category_id', 'processor', 'ram',
      'storage', 'display_size', 'graphics', 'price', 'sale_price',
      'images', 'specs', 'in_stock', 'featured', 'warranty', 'description',
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Product update error:', error);
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    if (!data) {
      res.status(404).json({ success: false, error: 'Product not found.' } as ApiResponse);
      return;
    }

    res.json({
      success: true,
      data,
      message: 'Product updated successfully.',
    } as ApiResponse);
  } catch (err) {
    console.error('Product update error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

/**
 * DELETE /api/products/:id
 * Admin – delete a product.
 */
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Product delete error:', error);
      res.status(400).json({ success: false, error: error.message } as ApiResponse);
      return;
    }

    res.json({
      success: true,
      message: 'Product deleted successfully.',
    } as ApiResponse);
  } catch (err) {
    console.error('Product delete error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' } as ApiResponse);
  }
});

export default router;
