const INITIAL_STATE = {
  name: "",
  initials: "",
  entryYear: "",
  image:""
}

export default function team(state = INITIAL_STATE, action) {
  if(action.type === "SET_TEAM") {
    return {
     ...state,
      name: action.payload.name,
      initials: action.payload.initials,
      entryYear: action.payload.entryYear,
      image: action.payload.image
    }
  }

  return state;
}
