/**
 * Utility functions for handling HTML content
 * Works in both SSR and client-side environments
 */

/**
 * Strips HTML tags from a string and returns plain text
 * @param html - HTML string to strip tags from
 * @param maxLength - Optional maximum length for the returned string
 * @returns Plain text without HTML tags
 */
export function stripHtmlTags(html: string | null | undefined, maxLength?: number): string {
  if (!html) return '';
  
  // Use regex for SSR compatibility (works on both server and client)
  let text = html
    // Remove script and style tags with their content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
  
  // Truncate if maxLength is provided
  if (maxLength && text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + '...';
  }
  
  return text;
}

/**
 * Extracts plain text excerpt from HTML content
 * @param html - HTML string to extract excerpt from
 * @param length - Desired length of excerpt (default: 150)
 * @returns Plain text excerpt
 */
export function getExcerpt(html: string | null | undefined, length: number = 150): string {
  return stripHtmlTags(html, length);
}

