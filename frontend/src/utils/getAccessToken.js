/**
 * @module utils/getAccessToken.js
 */

/**
* Função que pega o access token na local storage e retorna ele.
* 
*/
export function getAccessToken() {
  if(typeof window === 'object') {
    const accessToken = window.localStorage.getItem('accessToken');

    return accessToken;
  }
}
