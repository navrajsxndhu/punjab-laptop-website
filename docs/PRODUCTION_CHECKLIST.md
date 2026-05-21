# Production Checklist — Punjab Laptop Sirsa

## Pre-deploy

- [ ] Change default admin password in Supabase
- [ ] Set strong `JWT_SECRET` (32+ characters)
- [ ] Configure Supabase RLS policies (run `database/schema.sql`)
- [ ] Set production env vars on Vercel and Render
- [ ] Add real `NEXT_PUBLIC_SITE_URL` and `CORS_ORIGIN`
- [ ] Upload `public/images/og-image.jpg` (1200×630)
- [ ] Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## SEO

- [ ] Verify `/sitemap.xml` lists products and blog posts
- [ ] Verify `/robots.txt` allows public pages, blocks `/admin`
- [ ] Submit sitemap in Google Search Console
- [ ] Test rich results: LocalBusiness, Product, FAQ, BlogPosting

## Security

- [ ] HTTPS on frontend and API
- [ ] Supabase service key only on backend
- [ ] Cloudinary credentials only on backend
- [ ] Review CSP headers after adding new third-party scripts

## Functionality smoke test

- [ ] Homepage, products, product detail, offers, blog, about, contact
- [ ] WhatsApp links (919991020143) with prefilled messages
- [ ] Contact form → Supabase inquiries
- [ ] Admin login, CRUD, image upload
- [ ] Mobile navigation and admin drawer

## Performance

- [ ] Run Lighthouse on homepage and product page (target 90+ performance)
- [ ] Confirm no hydration warnings in browser console
- [ ] Test on 3G throttled mobile

## Monitoring

- [ ] Vercel Analytics enabled (automatic with `@vercel/analytics`)
- [ ] Google Analytics receiving events
- [ ] Render health check: `GET /api/health`

## Automated verification

From repo root (PowerShell):

```powershell
.\scripts\verify-production.ps1
```

Optional overrides:

```powershell
.\scripts\verify-production.ps1 -FrontendUrl "https://your-app.vercel.app" -ApiUrl "https://your-api.onrender.com"
```

Expect: health `200`, frontend home `200`, `/admin/login` `200`, local `npm run build` passes in `backend` and `frontend`.
