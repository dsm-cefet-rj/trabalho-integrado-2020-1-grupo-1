export function teamData(name, initials, entryYear) {
  return {
    type: 'SET_TEAM',
    payload: {
      name,
      initials,
      entryYear
    }
  }
}
