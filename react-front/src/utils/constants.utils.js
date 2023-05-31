export const BASEURL = 'http://127.0.0.1:8000/api'

export const API = {
  // auth
  login: `${BASEURL}/login`,
  register: `${BASEURL}/register`,
  users: `${BASEURL}/users`,

  // movies
  movies: `${BASEURL}/movies`,

  // Genres
  genres: `${BASEURL}/genres`,

  // Actors
  actors: `${BASEURL}/actors`,

  // Directors
  directors: `${BASEURL}/directors`,

  // Forms
  forms: `${BASEURL}/forms`,
}

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
}
