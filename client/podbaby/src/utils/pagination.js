export function pageNumberFromUrl(url) {
  const match = /.*?[\?&]page=(\d+).*?/.exec(url);
  if (match) {
    return Number(match[1]).valueOf();
  }
  return 1;
}
