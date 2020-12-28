export function getAccessToken() {
  if(typeof window === 'object') {
    const accessToken = window.localStorage.getItem('accessToken');

    return accessToken;
  }
}
