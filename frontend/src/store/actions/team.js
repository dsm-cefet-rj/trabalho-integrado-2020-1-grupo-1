export function teamData(name, initials, members, competitions, titles) {
  return {
    type: 'SET_TEAM',
    payload: {
      name,
      initials,
      members,
      competitions,
      titles
    }
  }
}
