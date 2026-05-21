# 🖥️ Punjab Laptop Sirsa — Premium Laptop Showcase

> **Sirsa's Most Trusted Laptop Destination** | New & Refurbished Laptops | Expert Repair Services
>
> 📍 Shop No. 52, New M.C. Market, Sirsa, Haryana 125055 | 📞 +91 9991020143

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Express](https://img.shields.io/badge/Express-4.x-green?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)

---

## 🎯 Overview

Full-stack production-ready website for **Punjab Laptop Sirsa (Punjab Laptop Solution)** — a laptop sales, repair, and accessories shop in Sirsa, Haryana with **47K+ Instagram followers** and **4.7★ rating on JustDial (200+ reviews)**.

### Features

- ✨ **Premium Apple-inspired UI** — Glassmorphism, smooth animations, cinematic hero
- 🛒 **Product Showcase** — Browse laptops with filters, search, and sorting
- 💬 **WhatsApp Integration** — One-tap inquiry with pre-filled product details
- 📝 **Admin CMS Dashboard** — Full product/offer/blog/banner management
- 🔍 **SEO Optimized** — Dynamic meta tags, schema.org, sitemap, Open Graph
- 📱 **Mobile-First Design** — Responsive across all devices
- 🔒 **Secure** — JWT auth, rate limiting, input validation, security headers

---

## 🏗️ Tech Stack

| Layer | Technology | Hosting |
|-------|-----------|---------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion | Vercel |
| **Backend** | Node.js, Express, TypeScript | Render |
| **Database** | PostgreSQL | Supabase |
| **Image Hosting** | Cloudinary | Cloud |
| **Icons** | Lucide React | — |
| **Carousel** | Embla Carousel | — |

---

## 📁 Project Structure

```
punjab-laptop-sirsa/
├── frontend/                    # Next.js 14 App Router
│   ├── src/
│   │   ├── app/                 # Pages (App Router)
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── products/        # Products listing + detail
│   │   │   ├── about/           # About Us
│   │   │   ├── contact/         # Contact page
│   │   │   ├── offers/          # Offers & Deals
│   │   │   ├── blog/            # Blog listing + detail
│   │   │   └── admin/           # Admin dashboard
│   │   ├── components/          # React components
│   │   ├── lib/                 # Utilities & API client
│   │   ├── hooks/               # Custom React hooks
│   │   └── types/               # TypeScript types
│   ├── tailwind.config.ts       # Design system
│   ├── next.config.js
│   └── package.json
│
├── backend/                     # Express.js API
│   ├── src/
│   │   ├── routes/              # API route handlers
│   │   ├── middleware/          # Auth, rate limiting, validation
│   │   ├── utils/               # Supabase & Cloudinary clients
│   │   └── index.ts             # Server entry
│   └── package.json
│
├── database/
│   ├── schema.sql               # PostgreSQL schema
│   └── seed.sql                 # Demo data
│
├── docs/                        # Documentation
├── vercel.json                  # Vercel config
├── render.yaml                  # Render config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- [Supabase](https://supabase.com) account
- [Cloudinary](https://cloudinary.com) account (free tier)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/punjab-laptop-sirsa.git
cd punjab-laptop-sirsa

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Database Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Go to SQL Editor and run:
   ```sql
   -- Run schema.sql first
   -- Then run seed.sql for demo data
   ```
3. Note your project URL and keys from Settings > API

### 3. Environment Variables

#### Frontend (`frontend/.env.local`)

```bash
cp frontend/.env.example frontend/.env.local
```

Fill in:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=919991020143
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Backend (`backend/.env`)

```bash
cp backend/.env.example backend/.env
```

Fill in:
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_role_key
JWT_SECRET=your_secret_key_minimum_32_characters
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### 4. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

### 5. Default Admin Login

```
Email: admin@punjablaptopsirsa.com
Password: admin123
```

⚠️ **Change this immediately in production!**

---

## 📡 API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products (with filters) |
| GET | `/api/products/:slug` | Product detail |
| GET | `/api/categories` | All categories |
| GET | `/api/brands` | All brands |
| GET | `/api/offers` | Active offers |
| GET | `/api/testimonials` | Customer reviews |
| GET | `/api/blog` | Published blog posts |
| GET | `/api/blog/:slug` | Blog post detail |
| GET | `/api/banners` | Active banners |
| POST | `/api/contact` | Submit inquiry (rate-limited) |

### Admin (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/admin/stats` | Dashboard statistics |
| POST/PUT/DELETE | `/api/products/:id` | Product CRUD |
| POST/PUT/DELETE | `/api/offers/:id` | Offer CRUD |
| POST/PUT/DELETE | `/api/blog/:id` | Blog CRUD |
| POST/PUT/DELETE | `/api/banners/:id` | Banner CRUD |
| GET | `/api/admin/inquiries` | View inquiries |
| POST | `/api/upload` | Upload image |

### Product Filters

```
GET /api/products?brand=dell&category=gaming&processor=i5&ram=8&minPrice=30000&maxPrice=60000&search=inspiron&sort=price_asc&page=1&limit=12
```

---

## 🌐 Deployment

### Frontend → Vercel

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variables from `.env.example`
4. Deploy

### Backend → Render

1. Connect your GitHub repository to [Render](https://render.com)
2. Create a new Web Service
3. Set root directory to `backend`
4. Build: `npm install && npm run build`
5. Start: `npm start`
6. Add environment variables
7. Deploy

### Database → Supabase

1. Run `database/schema.sql` in SQL Editor
2. Run `database/seed.sql` for initial data
3. RLS policies are included in schema.sql

---

## 📱 WhatsApp Integration

Every product card and detail page includes a **WhatsApp inquiry button** that opens WhatsApp with a pre-filled message:

```
Hello Punjab Laptop Sirsa, I am interested in: Dell Inspiron 15 | Intel Core i5-1235U | 8 GB RAM | Price: ₹38,999 | https://yoursite.com/products/dell-inspiron-15
```

A **floating WhatsApp button** appears on every page for instant contact.

---

## 🔒 Security

- JWT authentication for admin routes
- bcrypt password hashing
- Rate limiting (100 req/min general, 5/hour contact form)
- Input validation with express-validator
- Security headers via Helmet
- CORS origin restriction
- Environment variable management

---

## 📊 Admin Dashboard

Access at `/admin/login` — manage:

- **Products** — Add, edit, delete, mark featured/in-stock
- **Offers** — Create and manage deals
- **Blog** — Write and publish SEO articles
- **Banners** — Manage homepage hero banners
- **Inquiries** — View and respond to contact form submissions

---

## 🔍 SEO

- Dynamic `<title>` and `<meta>` per page
- Schema.org: `LocalBusiness`, `Product`, `BlogPosting`, `BreadcrumbList`
- Open Graph + Twitter Cards
- Dynamic `sitemap.xml`
- `robots.txt`
- Target keywords: laptop shop Sirsa, gaming laptops Sirsa, Punjab Laptop Sirsa

---

## 📞 Business Info

| | |
|---|---|
| **Shop** | Punjab Laptop Solution |
| **Address** | Shop No. 52, New M.C. Market, Circular Road, Sirsa |
| **Landmark** | Near Chawla Restaurant |
| **Phone** | +91 9991020143 |
| **Instagram** | [@punjab_laptop_sirsa](https://instagram.com/punjab_laptop_sirsa) (47K+ followers) |
| **YouTube** | [@punjablaptopsolution](https://youtube.com/@punjablaptopsolution) |
| **Rating** | 4.7★ on JustDial (200+ reviews) |
| **Hours** | Mon–Sat: 9:30 AM – 7:00 PM, Sunday: Closed |

---

## 📄 License

This project is proprietary. Built for Punjab Laptop Sirsa.

---

<p align="center">
  Made with ♥ in Sirsa, Haryana 🇮🇳
</p>
