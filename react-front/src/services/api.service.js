import axios from 'axios'
import { BASEURL } from '../utils/constants.utils'

export const api = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
