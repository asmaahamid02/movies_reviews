import { api } from './api.service'
import { API } from '../utils/constants.utils'

export const login = ({ email, password }) => {
  return api
    .post(API.login, { email, password })
    .then((response) => response.data)
}

export const register = ({ name, email, password }) => {
  return api
    .post(API.register, { name, email, password })
    .then((response) => response.data)
}

export const getUsers = (page, per_page) => {
  return api
    .get(`${API.users}?per_page=${per_page}&page=${page}`)
    .then((response) => response.data)
}
