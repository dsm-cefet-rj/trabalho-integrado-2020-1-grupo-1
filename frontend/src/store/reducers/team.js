const INITIAL_STATE = {
  name: "",
  initials: "",
  logoPictureURL: "",
  id: ""
}

/**
 * @module store/reducers/team.js 
 */

/**
 * Função responsável pela definição dos reducers de team.
 * @param {Object} state: Estado de team.
 * @param {Object} action: Objeto que contém os dados referentes a action.
 *
 */
export default function team(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_TEAM':
      return {
        ...state,
         name: action.payload.name,
         initials: action.payload.initials,
         logoPictureURL: action.payload.logoPictureURL,
         id: action.payload.id
       }
    case 'LOGOUT_TEAM':
      return {
        ...state,
         name: '',
         initials: '',
         logoPictureURL: '',
         id: ''
       }
    default:
      return state     
  }
}
