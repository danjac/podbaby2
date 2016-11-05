import sanitizeHtml from 'sanitize-html';

const sanitizeOptions = {
  allowedTags: ['a', 'code', 'em', 'strong', 'b', 'br', 'span', 'pre'],
  allowedAttributes: {
    a: ['href'],
    span: ['style'],
  },
};

export const sanitize = dirty => {
  // cleans HTML allowing only specific tags
  return {
    __html: sanitizeHtml(dirty.replace('\n', '<br>'), sanitizeOptions),
  };
};
