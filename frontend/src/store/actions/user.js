export function signinUser(name, username, profile_picture, role, champion1, champion2, champion3, facebook, instagram, twitter, other, email) {
  return {
    type: 'USER_LOGIN',
    payload: {
      name,
      username,
      profile_picture,
      role,
      champion1,
      champion2,
      champion3,
      facebook,
      instagram,
      twitter,
      other,
      email
    }
  }
}
