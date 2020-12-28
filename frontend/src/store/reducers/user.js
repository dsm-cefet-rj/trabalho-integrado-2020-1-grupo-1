const INITIAL_STATE = {
  name: "",
  email: "",
  birthdate: "",
  profilePictureURL: "",
  leagueOfLegendsUsername: "",
  preferredRole: "",
  computerSettings: "",
  socialMedia: "",
  team: "",
  favoriteChampions: "",
  id: "",
}

/**
 * @module store/reducers/user.js 
 */

/**
 * Função responsável pela definição dos reducers de user.
 * @param {Object} state: Estado do user.
 * @param {Object} action: Objeto que contém os dados referentes a action.
 *
 */
export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        birthdate: action.payload.birthdate,
        profilePictureURL: action.payload.profilePictureURL,
        leagueOfLegendsUsername: action.payload.leagueOfLegendsUsername,
        preferredRole: action.payload.preferredRole,
        computerSettings: action.payload.computerSettings,
        socialMedia: action.payload.socialMedia,
        team: action.payload.team,
        favoriteChampions: action.payload.favoriteChampions,
        id: action.payload.id,
      }
    case "EDIT_USER":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        birthdate: action.payload.birthdate,
        profilePictureURL: action.payload.profilePictureURL,
        leagueOfLegendsUsername: action.payload.leagueOfLegendsUsername,
        preferredRole: action.payload.preferredRole,
        computerSettings: action.payload.computerSettings,
        socialMedia: action.payload.socialMedia,
        team: action.payload.team,
        favoriteChampions: action.payload.favoriteChampions,
        id: action.payload.id,
      }
    case "LOGOUT_USER":
      return {
        ...state,
        name: "",
        email: "",
        birthdate: "",
        profilePictureURL: "",
        leagueOfLegendsUsername: "",
        preferredRole: "",
        computerSettings: "",
        socialMedia: "",
        team: "",
        favoriteChampions: "",
        id: "",
      }
    default:
      return state
  }
}
