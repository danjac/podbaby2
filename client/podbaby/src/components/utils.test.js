import {
  formatDate,
  timeSince,
  sanitize,
} from './utils';

describe('formatDate', () => {
  it('should not format an undefined date', () => {
    expect(formatDate(null)).toBeFalsy();
  });

  it('should format a date', () => {
    const date = new Date(2016, 10, 16);
    expect(formatDate(date)).toEqual('November 16th 2016');
  });
});

describe('timeSince', () => {
  it('should not format an undefined date', () => {
    expect(timeSince(null)).toBeFalsy();
  });

  it('should return time since', () => {
    expect(timeSince(new Date())).toEqual('a few seconds ago');
  });
});

describe('sanitize', () => {
  it('should return empty string if falsy argument', () => {
    expect(sanitize(null)).toEqual({ __html: '' });
  });

  it('should permit some tags', () => {
    const html = '<p><b>test</b><script>x=y</script></p>';
    expect(sanitize(html).__html).toEqual('<b>test</b>');
  });

  it('should replace linebreaks with <br>', () => {
    const html = 'first line\nsecond line';
    expect(sanitize(html).__html).toEqual('first line<br />second line');
  });
});
