const AUTH_TOKEN = 'auth-token';

export function getAuthToken() {
  return window.localStorage.getItem(AUTH_TOKEN);
}

export function setAuthToken(token) {
  if (token) {
    window.localStorage.setItem(AUTH_TOKEN, token);
  }
}

export function removeAuthToken() {
  window.localStorage.removeItem(AUTH_TOKEN);
}
