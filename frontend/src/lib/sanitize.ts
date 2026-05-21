/** Minimal HTML sanitizer for blog content — allowlist only safe tags */

const ALLOWED_TAGS = new Set([
  'p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote',
]);

const DANGEROUS = /<script|javascript:|on\w+\s*=/gi;

export function sanitizeHtml(html: string): string {
  if (!html || DANGEROUS.test(html)) {
    return html.replace(DANGEROUS, '');
  }

  return html
    .replace(/<(\/?)([\w]+)([^>]*)>/gi, (match, slash, tag, attrs) => {
      const t = tag.toLowerCase();
      if (!ALLOWED_TAGS.has(t)) return '';
      if (t === 'a') {
        const hrefMatch = attrs.match(/href\s*=\s*["']([^"']+)["']/i);
        const href = hrefMatch?.[1] || '';
        if (!href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) return '';
        return `<a href="${href}" rel="noopener noreferrer" target="_blank">`;
      }
      return `<${slash}${t}>`;
    });
}
