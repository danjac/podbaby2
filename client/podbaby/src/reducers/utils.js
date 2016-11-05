export const pageNumberFromUrl = url => {
  // parses page number from an API url
  // if url falsy, returns 0; otherwise returns default of 1
  if (!url) {
    return 0;
  }
  const match = /.*?[\?&]page=(\d+).*?/.exec(url);
  if (match) {
    return Number(match[1]).valueOf();
  }
  return 1;
};
