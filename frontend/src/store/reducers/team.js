const INITIAL_STATE = {
  name: "",
  initials: "",
  members: [],
  competitions: [],
  titles: []
}

export default function team(state = INITIAL_STATE, action) {
  if(action.type === "SET_TEAM") {
    return {
     ...state,
      name: action.payload.name,
      initials: action.payload.initials,
      members: action.payload.members,
      competitions: action.payload.competitions,
      titles: action.payload.titles
    }
  }

  return state;
}
