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
