/**
 * @module store/actions/team.js 
 */

/**
 * Função responsável por realizar a alteração de equipe na store do Redux quando o usuário é logado.
 * @param {String} name: Nome da equipe
 * @param {String} initials: Iniciais da equipe
 * @param {String} logoPictureURL: URL da imagem
 * @param {String} id: ID da equipe
 */
export function signinTeam(name, initials, logoPictureURL, id) {
  return {
    type: 'SET_TEAM',
    payload: {
      name,
      initials,
      logoPictureURL,
      id
    }
  }
}

/**
 * Função responsável por realizar a alteração de equipe na store do Redux quando o usuário é deslogado.
 * @param {String} name: Nome da equipe
 * @param {String} initials: Iniciais da equipe
 * @param {String} logoPictureURL: URL da imagem
 * @param {String} id: ID da equipe
 */
export function logoutTeam(name, initials, logoPictureURL, id) {
  return {
    type: 'LOGOUT_TEAM',
    payload: {
      name,
      initials,
      logoPictureURL,
      id
    }
  }
}
