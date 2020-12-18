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
