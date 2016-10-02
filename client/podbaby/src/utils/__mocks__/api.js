export function get(url) {
  if (url.match(/api\/episodes/ )) {
    return new Promise((resolve, reject) => {
      resolve({
        next: '/api/episodes/?page=2',
        previous: null,
        results: [{
          id: 1,
          title: 'Cool stuff',
        }, ]
      })
    });
  }
}

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
