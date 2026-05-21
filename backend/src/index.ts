import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { generalLimiter } from './middleware/rateLimiter';
import { sanitizeBody } from './middleware/sanitize';
import { validateEnvironment } from './utils/validateEnv';
import { createCorsOptions } from './utils/cors';

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';
import brandRoutes from './routes/brands';
import offerRoutes from './routes/offers';
import testimonialRoutes from './routes/testimonials';
import blogRoutes from './routes/blog';
import bannerRoutes from './routes/banners';
import contactRoutes from './routes/contact';
import adminRoutes from './routes/admin';
import uploadRoutes from './routes/upload';

dotenv.config();
validateEnvironment();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cors(createCorsOptions()));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeBody);
app.use(generalLimiter);

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'punjab-laptop-sirsa-api',
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Punjab Laptop Sirsa API running on port ${PORT}`);
});

export default app;
