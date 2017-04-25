import axios from 'axios';

export const userSignupRequest = (user) => {
  return dispatch => {
    return axios.post("/api/users", user);
  }
}

export const isUserExists = (identify) => {
  return dispatch => {
    return axios.get(`/api/users/${identify}`);
  }
}
