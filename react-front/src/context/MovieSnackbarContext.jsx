import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const MovieSnackbarContext = createContext()

const MovieSnackbarProvider = ({ children }) => {
  const [movieSnackbar, setMovieSnackbarr] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const openMovieSnackbar = (message, severity) => {
    setMovieSnackbarr({
      open: true,
      message,
      severity,
    })
  }

  const closeMovieSnackbar = () => {
    setMovieSnackbarr({
      open: false,
      message: '',
      severity: 'success',
    })
  }

  return (
    <MovieSnackbarContext.Provider
      value={{ movieSnackbar, openMovieSnackbar, closeMovieSnackbar }}
    >
      {children}
    </MovieSnackbarContext.Provider>
  )
}

MovieSnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { MovieSnackbarContext, MovieSnackbarProvider }
