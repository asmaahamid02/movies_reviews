import { api } from '../services/api.service'
import { API } from '../utils/constants.utils'

export const getMovies = (page, per_page) => {
  return api
    .get(`${API.movies}?per_page=${per_page}&page=${page}`)
    .then((response) => response.data)
}

export const addMovie = (movie) => {
  const formData = new FormData()
  formData.append('title', movie.title)
  formData.append('synopsis', movie.synopsis)
  movie.genres.forEach((element) => {
    formData.append('genres[]', element)
  })
  formData.append('age_restriction', movie.age_restriction)
  movie.images.forEach((element) => {
    formData.append('images[]', element)
  })
  formData.append('trailer_url', movie.trailer_url)
  formData.append('release_year', movie.release_year)
  formData.append('duration', movie.duration)
  formData.append('international_rating', movie.international_rating)
  formData.append('country', movie.country)
  formData.append('language', movie.language)

  //actors
  movie.actors.forEach((element, index) => {
    formData.append(`actors[${index}][name]`, element.name)
    formData.append(`actors[${index}][image]`, element.image)
    formData.append(`actors[${index}][birthday]`, element.birthday)
    formData.append(`actors[${index}][birthplace]`, element.birthplace)
    formData.append(`actors[${index}][biography]`, element.biography)
    formData.append(`actors[${index}][nationality]`, element.nationality)
    formData.append(`actors[${index}][gender]`, element.gender)
  })

  //directors
  movie.directors.forEach((element, index) => {
    formData.append(`directors[${index}][name]`, element.name)
    formData.append(`directors[${index}][image]`, element.image)
    formData.append(`directors[${index}][birthday]`, element.birthday)
    formData.append(`directors[${index}][birthplace]`, element.birthplace)
    formData.append(`directors[${index}][biography]`, element.biography)
    formData.append(`directors[${index}][nationality]`, element.nationality)
    formData.append(`directors[${index}][gender]`, element.gender)
  })

  return api
    .post(API.movies, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    })
    .then((response) => response.data)
}

export const deleteMovie = (id) => {
  return api.delete(`${API.movies}/${id}`).then((response) => response.data)
}
