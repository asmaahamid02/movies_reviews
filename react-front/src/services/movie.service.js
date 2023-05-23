import { api } from '../services/api.service'
import { API } from '../utils/constants.utils'

export const getMovies = (page, per_page) => {
  return api
    .get(`${API.movies}?per_page=${per_page}&page=${page}`)
    .then((response) => response.data)
}
