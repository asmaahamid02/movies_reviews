import { api } from '../services/api.service'
import { API } from '../utils/constants.utils'

export const addActors = (actors) => {
  const formData = new FormData()
  actors.forEach((element, index) => {
    formData.append(`actors[${index}][name]`, element.name)
    formData.append(`actors[${index}][image]`, element.image)
    formData.append(`actors[${index}][birthday]`, element.birthday)
    formData.append(`actors[${index}][birthplace]`, element.birthplace)
    formData.append(`actors[${index}][biography]`, element.biography)
    formData.append(`actors[${index}][nationality]`, element.nationality)
    formData.append(`actors[${index}][gender]`, element.gender)
  })
  return api
    .post(API.actors, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    })
    .then((response) => response.data)
}
