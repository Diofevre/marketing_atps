import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize HTML content from the API before rendering with
 * dangerouslySetInnerHTML. Allows only safe tags — strips all
 * scripts, event handlers, iframes, forms, and other XSS vectors.
 *
 * Used by blog/[slug] and any future page that renders API-sourced
 * HTML content.
 */
export function sanitizeContent(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'a', 'strong', 'em', 'b', 'i', 'u', 's',
      'blockquote', 'code', 'pre',
      'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span', 'sup', 'sub',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading'],
      td: ['colspan', 'rowspan'],
      th: ['colspan', 'rowspan'],
      '*': ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    // Force all links to open in new tab with noopener
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        target: '_blank',
        rel: 'noopener noreferrer',
      }),
    },
  });
}
