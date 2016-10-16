export function get(url) {

  if (url.match(/api\/categories/)) {
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: 1,
          name: 'Comedy',
        },
        {
          id: 1,
          name: 'Art',
        },
        {
          id: 1,
          name: 'Movies',
        },
      ]);
    });
  }

  if (url.match(/api\/auth\/me/)) {
    return new Promise((resolve, reject) => {
      resolve({
        bookmarks: [1, 2, 3],
        subscriptions: [1, 2, 3],
        username: 'tester',
        email: 'tester@gmail.com',
      });
    });
  }

  if (url.match(/api\/episodes\/1/)) {
    return new Promise((resolve, reject) => {
      resolve({
        id: 1,
        title: 'test',
      });
    });
  }

  if (url.match(/api\/episodes/ )) {
    return new Promise((resolve, reject) => {
      resolve({
        next: '/api/episodes/?page=2',
        previous: null,
        results: [{
          id: 1,
          title: 'Cool stuff',
        }, ]
      });
    });
  }
}

export function del(url) {
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
