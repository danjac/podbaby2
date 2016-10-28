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
