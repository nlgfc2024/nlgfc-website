/**
 * Composable for HTML utility functions
 * Provides easy access to HTML manipulation utilities in Vue components
 */
import { stripHtmlTags, getExcerpt } from '~/utils/htmlUtils';

export function useHtmlUtils() {
  return {
    stripHtmlTags,
    getExcerpt
  };
}

