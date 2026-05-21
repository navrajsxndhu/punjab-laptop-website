# Deployment Guide — Punjab Laptop Sirsa

## Architecture

```
Users → Vercel (Frontend) → Render (Backend API) → Supabase (Database)
                                    ↓
                              Cloudinary (Images)
```

---

## Step 1: Database (Supabase)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a region close to India (Singapore recommended)
3. Set a strong database password
4. Once created, go to **SQL Editor**
5. Paste and run `database/schema.sql`
6. Paste and run `database/seed.sql`
7. Go to **Settings → API** and note:
   - **Project URL** (e.g., `https://xyz.supabase.co`)
   - **anon public key**
   - **service_role key** (secret — only for backend)

## Step 2: Image Hosting (Cloudinary)

1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier: 25 credits/month)
2. Go to Dashboard and note:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## Step 3: Backend (Render)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Name:** `punjab-laptop-sirsa-api`
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Region:** Singapore
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your_service_role_key
   JWT_SECRET=generate_a_random_32+_char_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CORS_ORIGIN=https://your-vercel-domain.vercel.app
   ```
6. Deploy — note the Render URL (e.g., `https://punjab-laptop-sirsa-api.onrender.com`)

## Step 4: Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Settings:
   - **Framework:** Next.js
   - **Root Directory:** `frontend`
4. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://punjab-laptop-sirsa-api.onrender.com
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_WHATSAPP_NUMBER=919991020143
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```
5. Deploy

## Step 5: Custom Domain (Optional)

### On Vercel:
1. Go to Project Settings → Domains
2. Add `punjablaptopsirsa.com` (or your domain)
3. Update DNS records as instructed

### Update CORS:
1. On Render, update `CORS_ORIGIN` to your custom domain
2. On Vercel, update `NEXT_PUBLIC_SITE_URL` to your custom domain

## Step 6: Post-Deployment

1. **Change admin password** — Login to admin panel, or update directly in Supabase
2. **Test all pages** — Homepage, products, product detail, contact form
3. **Test WhatsApp** — Click inquiry buttons and verify messages
4. **Submit sitemap** — Submit `your-domain/sitemap.xml` to Google Search Console
5. **Monitor** — Check Render logs for API errors, Vercel analytics for traffic

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Verify `CORS_ORIGIN` on Render matches your Vercel domain |
| API not responding | Check Render logs; free tier may spin down after inactivity |
| Images not loading | Verify Cloudinary credentials; check `next.config.js` remote patterns |
| Admin login fails | Check `JWT_SECRET` is the same on both frontend and backend |
| Products not showing | Verify Supabase URL and keys; check RLS policies |

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong `JWT_SECRET` (32+ characters)
- [ ] Set `CORS_ORIGIN` to your exact domain (not `*`)
- [ ] Enable Supabase RLS on all tables
- [ ] Use HTTPS everywhere
- [ ] Restrict Supabase service key to backend only
