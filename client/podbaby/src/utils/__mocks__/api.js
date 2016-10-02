export function post(url, data) {
  if (url.match(/api-token-auth/)) {
    return new Promise((resolve, reject) => {
      if (data.username === 'tester' && data.password === 'testpass') {
        resolve({
          token: 'abc1234',
        });
      } else {
        resolve({
          errors: 'Bad login',
        });
      }
    });
  }
}
