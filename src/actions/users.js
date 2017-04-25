export const userSignupRequest = (user) => {
  return dispatch => {
    return fetch("/api/users",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(user)
    });
  }
}
