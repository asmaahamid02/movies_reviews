import { api } from '../services/api.service'
import { API } from '../utils/constants.utils'

export const addDirectors = (directors) => {
  const formData = new FormData()
  directors.forEach((element, index) => {
    formData.append(`directors[${index}][name]`, element.name)
    formData.append(`directors[${index}][image]`, element.image)
    formData.append(`directors[${index}][birthday]`, element.birthday)
    formData.append(`directors[${index}][birthplace]`, element.birthplace)
    formData.append(`directors[${index}][biography]`, element.biography)
    formData.append(`directors[${index}][nationality]`, element.nationality)
    formData.append(`directors[${index}][gender]`, element.gender)
  })
  return api
    .post(API.directors, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    })
    .then((response) => response.data)
}
