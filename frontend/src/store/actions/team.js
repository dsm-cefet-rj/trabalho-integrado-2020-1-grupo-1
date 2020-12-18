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
