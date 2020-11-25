const INITIAL_STATE = {
  name: "",
  initials: "",
  entryYear: "",
  image:""
}

export default function team(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_TEAM':
      return {
        ...state,
         name: action.payload.name,
         initials: action.payload.initials,
         entryYear: action.payload.entryYear,
         image: action.payload.image
       }
    case 'LOGOUT_TEAM':
      return {
        ...state,
         name: '',
         initials: '',
         entryYear: '',
         image: ''
       }
    default:
      return state     
  }
}
