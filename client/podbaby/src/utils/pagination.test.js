import { parsePageNumberFromUrl } from './pagination';

it('should parse 1 from url if no page found', () => {
  const url = '/api/episodes/';
  expect(parsePageNumberFromUrl(url)).toBe(1);
});

it('should parse page from url', () => {
  const url = '/api/episodes/?page=3';
  expect(parsePageNumberFromUrl(url)).toBe(3);
});

it('should not parse non-numeric page from url', () => {
  const url = '/api/episodes/?page=x';
  expect(parsePageNumberFromUrl(url)).toBe(1);
});
