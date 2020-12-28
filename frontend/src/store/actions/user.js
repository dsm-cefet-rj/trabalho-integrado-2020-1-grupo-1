/**
 * @module store/actions/user.js 
 */

/**
 * Função responsável por realizar a alteração na store do Redux quando o usuário é logado.
 * @param {String} name: Nome do usuário
 * @param {String} email: Email do usuário
 * @param {String} birthdate: Data de aniversário do usuário
 * @param {String} profilePictureURL: Imagem de perfil do usuário
 * @param {String} leagueOfLegendsUsername: Username do League of Legends do usuário
 * @param {String} preferredRole: Role preferida do usuário
 * @param {Object} computerSettings: Objeto com as configurações do computador do usuário
 * @param {Object} socialMedia: Objeto com as redes sociais do usuário
 * @param {String} team: ID da equipe do usuário
 * @param {Object} favoriteChampions: Objeto com os campeões favoritos do usuário
 * @param {String} id: ID do usuário
 */
export function signinUser(name, email, birthdate, profilePictureURL, leagueOfLegendsUsername, preferredRole, computerSettings, socialMedia, team, favoriteChampions, id) {
  return {
    type: 'USER_LOGIN',
    payload: {
      name,
      email,
      birthdate,
      profilePictureURL,
      leagueOfLegendsUsername,
      preferredRole,
      computerSettings,
      socialMedia,
      team,
      favoriteChampions,
      id
    }
  }
}

/**
 * Função responsável por realizar a alteração na store do Redux quando o usuário sofre uma alteração de dados.
 * @param {String} name: Nome do usuário
 * @param {String} email: Email do usuário
 * @param {String} birthdate: Data de aniversário do usuário
 * @param {String} profilePictureURL: Imagem de perfil do usuário
 * @param {String} leagueOfLegendsUsername: Username do League of Legends do usuário
 * @param {String} preferredRole: Role preferida do usuário
 * @param {String} computerSettings: Objeto com as configurações do computador do usuário
 * @param {String} socialMedia: Objeto com as redes sociais do usuário
 * @param {String} team: ID da equipe do usuário
 * @param {String} favoriteChampions: Objeto com os campeões favoritos do usuário
 * @param {String} id: ID do usuário
 */
export function editUser(name, email, birthdate, profilePictureURL, leagueOfLegendsUsername, preferredRole, computerSettings, socialMedia, team, favoriteChampions, id) {
  return {
    type: 'EDIT_USER',
    payload: {
      name,
      email,
      birthdate,
      profilePictureURL,
      leagueOfLegendsUsername,
      preferredRole,
      computerSettings,
      socialMedia,
      team,
      favoriteChampions,
      id
    }
  }
}

/**
 * Função responsável por realizar a alteração na store do Redux quando o usuário é deslogado.
 * @param {String} name: Nome do usuário
 * @param {String} email: Email do usuário
 * @param {String} birthdate: Data de aniversário do usuário
 * @param {String} profilePictureURL: Imagem de perfil do usuário
 * @param {String} leagueOfLegendsUsername: Username do League of Legends do usuário
 * @param {String} preferredRole: Role preferida do usuário
 * @param {String} computerSettings: Objeto com as configurações do computador do usuário
 * @param {String} socialMedia: Objeto com as redes sociais do usuário
 * @param {String} team: ID da equipe do usuário
 * @param {String} favoriteChampions: Objeto com os campeões favoritos do usuário
 * @param {String} id: ID do usuário
 */
export function logoutUser(name, email, birthdate, profilePictureURL, leagueOfLegendsUsername, preferredRole, computerSettings, socialMedia, team, favoriteChampions, id) {
  return {
    type: 'LOGOUT_USER',
    payload: {
      name,
      email,
      birthdate,
      profilePictureURL,
      leagueOfLegendsUsername,
      preferredRole,
      computerSettings,
      socialMedia,
      team,
      favoriteChampions,
      id
    }
  }
}
