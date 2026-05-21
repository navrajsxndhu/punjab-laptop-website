# API Documentation — Punjab Laptop Sirsa

Base URL: `https://your-api.onrender.com` (development: `http://localhost:5000`)

All JSON responses use:

```json
{ "success": true, "data": {}, "message": "optional" }
```

Errors return `{ "success": false, "error": "message" }`.

## Public

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products (filters: brand, category, search, sort, page, limit) |
| GET | `/api/products/:slug` | Product by slug |
| GET | `/api/categories` | Categories |
| GET | `/api/brands` | Brands |
| GET | `/api/offers` | Active offers |
| GET | `/api/testimonials` | Testimonials |
| GET | `/api/blog` | Published blog posts |
| GET | `/api/blog/:slug` | Blog post by slug |
| GET | `/api/banners` | Active homepage banners |
| POST | `/api/contact` | Submit inquiry (rate-limited) |

## Auth

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Admin login → `{ token, user }` |
| POST | `/api/auth/verify` | Verify JWT (Bearer) |
| POST | `/api/auth/refresh` | Refresh JWT (Bearer) |

## Admin (Bearer token required)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products/by-id/:id` | Product by UUID |
| POST/PUT/DELETE | `/api/products`, `/api/products/:id` | Product CRUD |
| GET | `/api/offers/manage` | All offers |
| POST/PUT/DELETE | `/api/offers`, `/api/offers/:id` | Offer CRUD |
| GET | `/api/blog/manage` | All blog posts |
| GET | `/api/blog/manage/post/:id` | Blog post by id |
| POST/PUT/DELETE | `/api/blog`, `/api/blog/:id` | Blog CRUD |
| GET | `/api/banners/manage` | All banners |
| POST/PUT/DELETE | `/api/banners`, `/api/banners/:id` | Banner CRUD |
| POST/PUT/DELETE | `/api/testimonials`, `/api/testimonials/:id` | Testimonial CRUD |
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/inquiries` | All inquiries |
| GET | `/api/admin/inquiries/recent` | Recent inquiries |
| PATCH | `/api/admin/inquiries/:id/read` | Mark read |
| DELETE | `/api/admin/inquiries/:id` | Delete inquiry |
| POST | `/api/upload` | Image upload (multipart `file`) |

## Example: Product filters

```
GET /api/products?brand=dell&category=gaming&sort=price_asc&page=1&limit=12
```
