import { Request, Response, NextFunction } from 'express';

const SCRIPT_PATTERN = /<script|javascript:|on\w+\s*=/gi;

function sanitizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.replace(SCRIPT_PATTERN, '').trim();
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = sanitizeValue(v);
    }
    return out;
  }
  return value;
}

/** Strip obvious XSS patterns from JSON request bodies */
export function sanitizeBody(req: Request, _res: Response, next: NextFunction): void {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body);
  }
  next();
}
