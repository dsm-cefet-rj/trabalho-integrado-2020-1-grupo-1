export function teamData(name, initials, entryYear, image) {
  return {
    type: 'SET_TEAM',
    payload: {
      name,
      initials,
      entryYear,
      image
    }
  }
}

export function logoutTeam(name, initials, entryYear, image) {
  return {
    type: 'LOGOUT_TEAM',
    payload: {
      name,
      initials,
      entryYear,
      image
    }
  }
}
