# Live deployment URLs (confirmed)

| Service | URL | Status |
|---------|-----|--------|
| **Frontend (production)** | https://punjab-laptop-website-4epm.vercel.app | 200 OK |
| **Backend API** | https://punjab-laptop-website.onrender.com | Health 200 OK |
| Health check | https://punjab-laptop-website.onrender.com/api/health | OK |

## Not used (404 or broken)

- `https://punjab-laptop-website.vercel.app` — project deploy errors
- `https://punjab-laptop-sirsa-api.onrender.com` — service does not exist

## Render env fix required

Products API and admin login return **500** on Render until these match local `backend/.env`:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `JWT_SECRET`
- `CORS_ORIGIN` = `https://punjab-laptop-website-4epm.vercel.app`
- Cloudinary `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` (for uploads)

After updating env on Render: **Manual Deploy** → wait for restart → re-run `scripts/verify-production.ps1`.

## Vercel env (set via CLI)

- `NEXT_PUBLIC_API_URL` = `https://punjab-laptop-website.onrender.com`
- `NEXT_PUBLIC_SITE_URL` = `https://punjab-laptop-website-4epm.vercel.app`
- Supabase public URL + anon key
- `NEXT_PUBLIC_WHATSAPP_NUMBER` = `919991020143`
