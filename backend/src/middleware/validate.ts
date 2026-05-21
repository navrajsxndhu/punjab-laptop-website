import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check validation results and return 400 on failure.
 */
export function handleValidationErrors(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      data: errors.array().map((e) => ({
        field: 'path' in e ? e.path : 'unknown',
        message: e.msg,
      })),
    });
    return;
  }
  next();
}

// ── Contact Form Validation ─────────────────────────────────────────

export const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('phone')
    .optional({ values: 'null' })
    .trim()
    .isMobilePhone('any').withMessage('Invalid phone number'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
  handleValidationErrors,
];

// ── Product Validation ──────────────────────────────────────────────

export const validateProduct = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 2, max: 200 }).withMessage('Name must be 2-200 characters'),
  body('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Slug must be lowercase alphanumeric with hyphens'),
  body('brand_id')
    .notEmpty().withMessage('Brand is required')
    .isUUID().withMessage('Invalid brand ID'),
  body('category_id')
    .notEmpty().withMessage('Category is required')
    .isUUID().withMessage('Invalid category ID'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('sale_price')
    .optional({ values: 'null' })
    .isFloat({ min: 0 }).withMessage('Sale price must be a positive number'),
  body('processor').optional().trim(),
  body('ram').optional().trim(),
  body('storage').optional().trim(),
  body('display_size').optional().trim(),
  body('graphics').optional().trim(),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('specs').optional().isObject().withMessage('Specs must be a JSON object'),
  body('in_stock').optional().isBoolean().withMessage('in_stock must be boolean'),
  body('featured').optional().isBoolean().withMessage('featured must be boolean'),
  body('warranty').optional().trim(),
  body('description').optional().trim(),
  handleValidationErrors,
];

// ── Blog Post Validation ────────────────────────────────────────────

export const validateBlogPost = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 300 }).withMessage('Title must be 3-300 characters'),
  body('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Slug must be lowercase alphanumeric with hyphens'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required'),
  body('excerpt').optional().trim(),
  body('cover_image')
    .optional({ values: 'falsy' })
    .trim()
    .custom((val) => !val || /^https?:\/\/.+/.test(val))
    .withMessage('Cover image must be a valid URL'),
  body('author')
    .trim()
    .notEmpty().withMessage('Author is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('published').optional().isBoolean().withMessage('published must be boolean'),
  handleValidationErrors,
];

// ── Offer Validation ────────────────────────────────────────────────

export const validateOffer = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('description').optional().trim(),
  body('discount_type')
    .notEmpty().withMessage('Discount type is required')
    .isIn(['percentage', 'flat', 'special']).withMessage('Discount type must be percentage, flat, or special'),
  body('discount_value')
    .optional({ values: 'null' })
    .isFloat({ min: 0 }).withMessage('Discount value must be a positive number'),
  body('valid_from')
    .notEmpty().withMessage('Valid from date is required')
    .isISO8601().withMessage('Valid from must be a valid date'),
  body('valid_until')
    .notEmpty().withMessage('Valid until date is required')
    .isISO8601().withMessage('Valid until must be a valid date'),
  body('banner_image').optional().trim(),
  body('products').optional().isArray().withMessage('Products must be an array of UUIDs'),
  body('active').optional().isBoolean().withMessage('active must be boolean'),
  handleValidationErrors,
];

// ── Banner Validation ───────────────────────────────────────────────

export const validateBanner = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2, max: 200 }).withMessage('Title must be 2-200 characters'),
  body('subtitle').optional().trim(),
  body('image_url')
    .trim()
    .notEmpty().withMessage('Image URL is required'),
  body('link').optional().trim(),
  body('active').optional().isBoolean().withMessage('active must be boolean'),
  body('sort_order').optional().isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer'),
  handleValidationErrors,
];

// ── Auth Validation ─────────────────────────────────────────────────

export const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Username/Email is required'),
  body('password')
    .notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];
