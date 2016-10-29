import sanitizeHtml from 'sanitize-html';

const sanitizeOptions = {
  allowedTags: ['a', 'code', 'em', 'strong', 'b', 'br', 'span', 'pre', ],
  allowedAttributes: {
    a: ['href', ],
    span: ['style', ],
  },
};

export const sanitize = dirty => {
  return {
    __html: sanitizeHtml(dirty.replace('\n', '<br>'), sanitizeOptions),
  };
};

export function pageNumberFromUrl(url) {
  if (!url) {
    return 0;
  }
  const match = /.*?[\?&]page=(\d+).*?/.exec(url);
  if (match) {
    return Number(match[1]).valueOf();
  }
  return 1;
}
