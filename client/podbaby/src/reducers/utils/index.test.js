import { pageNumberFromUrl } from './index';

describe('pageNumberFromUrl', () => {
  it('should parse 0 from url if null', () => {
    expect(pageNumberFromUrl(null)).toBe(0);
  });

  it('should parse 1 from url if no page found', () => {
    const url = '/api/episodes/';
    expect(pageNumberFromUrl(url)).toBe(1);
  });

  it('should parse page from url', () => {
    const url = '/api/episodes/?page=3';
    expect(pageNumberFromUrl(url)).toBe(3);
  });

  it('should not parse non-numeric page from url', () => {
    const url = '/api/episodes/?page=x';
    expect(pageNumberFromUrl(url)).toBe(1);
  });
});
