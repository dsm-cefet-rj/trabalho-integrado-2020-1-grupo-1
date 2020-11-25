const INITIAL_STATE = {
  name: "",
  username: "",
  profile_picture: "",
  role: "",
  champion1: "",
  champion2: "",
  champion3: "",
  facebook: "",
  instagram: "",
  twitter: "",
  other: "",
  email: ""
}

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case "USER_LOGIN":
      return {
        ...state,
         name: action.payload.name,
         username: action.payload.username,
         profile_picture: action.payload.profile_picture,
         role: action.payload.role,
         champion1: action.payload.champion1,
         champion2: action.payload.champion2,
         champion3: action.payload.champion3,
         facebook: action.payload.facebook,
         instagram: action.payload.instagram,
         twitter: action.payload.twitter,
         other: action.payload.other,
         email: action.payload.email,
      }
    case "EDIT_USER":
      return {
        ...state,
         name: action.payload.name,
         username: action.payload.username,
         profile_picture: action.payload.profile_picture,
         role: action.payload.role,
         champion1: action.payload.champion1,
         champion2: action.payload.champion2,
         champion3: action.payload.champion3,
         facebook: action.payload.facebook,
         instagram: action.payload.instagram,
         twitter: action.payload.twitter,
         other: action.payload.other,
         email: action.payload.email,
      }
    case "LOGOUT_USER":
      return {
        ...state,
         name: '',
         username: '',
         profile_picture: '',
         role: '',
         champion1: '',
         champion2: '',
         champion3: '',
         facebook: '',
         instagram: '',
         twitter: '',
         other: '',
         email: '',
      }
    default:
      return state
  }
}
