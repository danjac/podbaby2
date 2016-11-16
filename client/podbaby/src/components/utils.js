import moment from 'moment';
import sanitizeHtml from 'sanitize-html';

const sanitizeOptions = {
  allowedTags: ['a', 'code', 'em', 'strong', 'b', 'br', 'span', 'pre'],
  allowedAttributes: {
    a: ['href'],
    span: ['style'],
  },
};

export const sanitize = dirty => {
  if (!dirty) {
    return { __html: '' };
  }
  // cleans HTML allowing only specific tags
  return {
    __html: sanitizeHtml(dirty.replace('\n', '<br>'), sanitizeOptions),
  };
};

export const formatDate = (date, format = 'MMMM Do YYYY') => date && moment(date).format(format);

export const timeSince = date => date && moment(date).fromNow();
