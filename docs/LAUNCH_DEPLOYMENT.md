# Live Launch Guide — Punjab Laptop Sirsa

Deploy in this order: **Supabase → Render → Vercel → CORS sync → smoke test**.

Repository: https://github.com/navrajsxndhu/punjab-laptop-website (branch `main`)

---

## Phase 1 — Supabase (database)

### 1.1 Create project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. **Name:** `punjab-laptop-sirsa`
3. **Region:** Southeast Asia (Singapore)
4. Set a strong database password (save in password manager)
5. Wait until project status is **Active**

### 1.2 Run schema

1. **SQL Editor** → **New query**
2. Paste entire contents of `database/schema.sql` from the repo
3. **Run** — expect success (tables, RLS, triggers)

### 1.3 Run seed

1. New query → paste `database/seed.sql`
2. **Run** — creates admin user, categories, brands, products, blog, banners, etc.

### 1.4 Copy API credentials

**Settings → API:**

| Copy this | Use on |
|-----------|--------|
| Project URL | Render `SUPABASE_URL`, Vercel `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` `public` key | Vercel `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` `secret` key | Render `SUPABASE_SERVICE_KEY` only |

### 1.5 Change default admin password (required before launch)

Seed creates:

- Email: `admin@punjablaptopsirsa.com`
- Password: `admin123` (**change immediately**)

Options:

- After first login at `/admin/login`, use Settings (if implemented), or
- Generate new bcrypt hash and update `admin_users.password_hash` in Supabase Table Editor

---

## Phase 2 — Render (backend API)

### 2.1 Create web service

1. [dashboard.render.com](https://dashboard.render.com) → **New +** → **Web Service**
2. Connect GitHub repo `punjab-laptop-website`
3. Settings:

| Setting | Value |
|---------|--------|
| Name | `punjab-laptop-sirsa-api` |
| Region | Singapore |
| Branch | `main` |
| Root Directory | `backend` |
| Runtime | Node |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

*Or use **Blueprint** with root `render.yaml`.*

### 2.2 Environment variables (Render)

Set in **Environment** tab:

```env
NODE_ENV=production
PORT=5000
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_secret
JWT_SECRET=your_64_char_secret_same_as_local
CLOUDINARY_CLOUD_NAME=dtfiywaxm
CLOUDINARY_API_KEY=from_cloudinary_console
CLOUDINARY_API_SECRET=from_cloudinary_console
CLOUDINARY_UPLOAD_PRESET=punjab_laptop_sirsa_admin
CLOUDINARY_UPLOAD_FOLDER=punjab-laptop-sirsa
CORS_ORIGIN=https://YOUR_VERCEL_URL.vercel.app
```

**JWT_SECRET:** Use the value generated for launch (64 chars, base64url). Must match what you set locally for testing.

**CORS_ORIGIN:** Set after Vercel deploy. Use exact origin, no trailing slash. Multiple origins: comma-separated, e.g. `https://punjablaptopsirsa.com,https://www.punjablaptopsirsa.com`

### 2.3 Deploy and verify

1. **Manual Deploy** or wait for auto-deploy
2. Note service URL: `https://punjab-laptop-sirsa-api.onrender.com` (yours may differ)
3. Test: `GET https://YOUR_API.onrender.com/api/health`

Expected:

```json
{"success":true,"data":{"status":"ok",...}}
```

**If you get 404:** the service name/URL does not exist yet — finish Render setup and deploy first.

---

## Phase 3 — Vercel (frontend)

### 3.1 Import project

1. [vercel.com/new](https://vercel.com/new) → Import `punjab-laptop-website`
2. **Framework Preset:** Next.js
3. **Root Directory:** leave empty (uses repo `vercel.json`) OR set `frontend`

### 3.2 Environment variables (Vercel)

```env
NEXT_PUBLIC_API_URL=https://YOUR_RENDER_SERVICE.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
NEXT_PUBLIC_SITE_URL=https://YOUR_VERCEL_PROJECT.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=919991020143
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Optional: add Google Analytics ID when ready.

### 3.3 Deploy

1. **Deploy**
2. Note URL: e.g. `https://punjab-laptop-website.vercel.app`

### 3.4 Custom domain (optional)

**Settings → Domains** → add `punjablaptopsirsa.com` → follow DNS instructions.

Update:

- Vercel `NEXT_PUBLIC_SITE_URL` → production domain
- Render `CORS_ORIGIN` → same domain
- Redeploy both

---

## Phase 4 — CORS sync (critical)

After you have both URLs:

1. Render → `CORS_ORIGIN` = exact Vercel URL (e.g. `https://punjab-laptop-website.vercel.app`)
2. Vercel → `NEXT_PUBLIC_API_URL` = exact Render URL (no trailing slash)
3. **Redeploy Render** (env change requires redeploy)
4. **Redeploy Vercel** if you changed `NEXT_PUBLIC_*` vars

Test in browser DevTools → Network: admin login should not show CORS errors.

---

## Phase 5 — Cloudinary

| Item | Value | Status |
|------|--------|--------|
| Cloud name | `dtfiywaxm` | Configured |
| Upload preset | `punjab_laptop_sirsa_admin` | Signed, folder `punjab-laptop-sirsa` |
| API Key + Secret | Render env only | **You must paste from console** |

Console: https://console.cloudinary.com/app/settings/api-keys

---

## Phase 6 — Production smoke test

Run after both services are live.

### Infrastructure

- [ ] `GET <render>/api/health` → 200, `status: ok`
- [ ] `https://<vercel>/robots.txt` → allows `/`, disallows `/admin/`
- [ ] `https://<vercel>/sitemap.xml` → valid XML with static + product URLs
- [ ] View page source → JSON-LD LocalBusiness / FAQ on homepage
- [ ] `https://<vercel>/images/og-image.jpg` → loads (1200×630)

### Admin

- [ ] `/admin/login` → login with admin email (not default password if changed)
- [ ] Dashboard loads stats
- [ ] Upload image on product form → Cloudinary URL returned

### Public site

- [ ] Homepage, `/products`, product detail, `/offers`, `/blog`, `/about`, `/contact`
- [ ] WhatsApp button → opens `wa.me/919991020143` with message
- [ ] Contact form submit → inquiry in `/admin/inquiries`

### Performance

- [ ] No console hydration errors
- [ ] Lighthouse homepage (target 90+ mobile performance)

---

## Env var checklist (copy before deploy)

### Render — all required

- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_KEY`
- [ ] `JWT_SECRET` (32+ chars)
- [ ] `CLOUDINARY_CLOUD_NAME=dtfiywaxm`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `CORS_ORIGIN` (Vercel URL)

### Vercel — all required

- [ ] `NEXT_PUBLIC_API_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER=919991020143`

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| CORS error on login | Match `CORS_ORIGIN` to exact browser origin |
| 401 admin login | Check Supabase seed + JWT_SECRET on Render |
| Upload 500 | Cloudinary API key/secret on Render |
| Empty products | Supabase keys on Vercel; redeploy |
| Sitemap missing products | Set Supabase env on Vercel, redeploy |
| Render slow first request | Free tier cold start; retry after 60s |
