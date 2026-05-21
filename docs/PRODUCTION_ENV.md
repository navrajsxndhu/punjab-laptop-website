# Production environment variables (reference)

Copy values from local `backend/.env` and `frontend/.env.local` (never commit these files).

## Render (`backend` service)

| Variable | Source |
|----------|--------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `SUPABASE_URL` | Same as local |
| `SUPABASE_SERVICE_KEY` | Supabase Dashboard → Settings → API → service_role |
| `JWT_SECRET` | Same 64-char value as local `backend/.env` |
| `CLOUDINARY_CLOUD_NAME` | `dtfiywaxm` |
| `CLOUDINARY_API_KEY` | Cloudinary console |
| `CLOUDINARY_API_SECRET` | Cloudinary console |
| `CLOUDINARY_UPLOAD_PRESET` | `punjab_laptop_sirsa_admin` |
| `CLOUDINARY_UPLOAD_FOLDER` | `punjab-laptop-sirsa` |
| `CORS_ORIGIN` | Exact Vercel URL after deploy (no trailing slash) |

## Vercel (frontend)

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `https://punjab-laptop-sirsa-api.onrender.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://jdrhwkompeuhfzznujls.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel deployment URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `919991020143` |

After Vercel deploy: update Render `CORS_ORIGIN` and redeploy backend.
