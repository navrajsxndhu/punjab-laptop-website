import type { CorsOptions } from 'cors';

const DEFAULT_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000'];

function parseAllowedOrigins(): string[] {
  const fromEnv = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  return [...new Set([...DEFAULT_ORIGINS, ...fromEnv])];
}

function isAllowedOrigin(origin: string, allowed: string[]): boolean {
  if (allowed.includes(origin)) return true;
  if (process.env.CORS_ALLOW_VERCEL === 'false') return false;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return true;
  if (/^https:\/\/(www\.)?punjablaptopsirsa\.com$/i.test(origin)) return true;
  return false;
}

export function createCorsOptions(): CorsOptions {
  const allowed = parseAllowedOrigins();

  return {
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (isAllowedOrigin(origin, allowed)) {
        callback(null, true);
        return;
      }
      console.warn(`CORS blocked origin: ${origin}. Allowed: ${allowed.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  };
}
