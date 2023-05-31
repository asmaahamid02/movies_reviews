import { api } from './api.service'
import { API } from '../utils/constants.utils'

export const addForm = (form) => {
  return api.post(API.forms, form).then((response) => response.data)
}

export const getForms = () => {
  return api.get(API.forms).then((response) => response.data)
}

export const getFormById = (id) => {
  return api.get(`${API.forms}/${id}`).then((response) => response.data)
}

export const deleteForm = (id) => {
  return api.delete(`${API.forms}/${id}`).then((response) => response.data)
}
