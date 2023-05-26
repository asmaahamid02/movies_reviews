import { useContext } from 'react'
import { MovieSnackbarContext } from '../context/MovieSnackbarContext'

const useMovieSnackbar = () => {
  return useContext(MovieSnackbarContext)
}

export default useMovieSnackbar
