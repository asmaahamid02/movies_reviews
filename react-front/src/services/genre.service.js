import { api } from '../services/api.service'
import { API } from '../utils/constants.utils'

export const getGenres = () => {
  return api.get(API.genres).then((response) => response.data)
}
