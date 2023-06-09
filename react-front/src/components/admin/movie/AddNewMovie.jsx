import {
  Alert,
  AppBar,
  CircularProgress,
  Container,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import * as Yup from 'yup'
import {
  addMovie,
  getMovieById,
  updateMovie,
} from '../../../services/movie.service'
import MultiStepForm, { FormStep } from '../../common/MultiStepForm'
import useMovieSnackbar from '../../../hooks/useMovieSnackbar'
import PropTypes from 'prop-types'
import MovieDetails from './MovieDetails'
import MovieActors from './MovieActors'
import MovieDirectors from './MovieDirectors'

const cast = {
  id: '',
  name: '',
  image: null,
  birthday: '',
  birthplace: '',
  biography: '',
  nationality: '',
  gender: '',
}

const movieValidationSchema = Yup.object({
  title: Yup.string().required('Required'),
  synopsis: Yup.string().required('Required'),
  genres: Yup.array().required('Required').min(1),
  age_restriction: Yup.string().required('Required'),
  images: Yup.array().required('Required').min(1),
  trailer_url: Yup.string().required('Required'),
  release_year: Yup.number()
    .required('Required')
    .min(1800)
    .max(new Date().getFullYear()),
  duration: Yup.number().required('Required'),
  international_rating: Yup.number().required('Required').min(0).max(10),
  country: Yup.string().required('Required'),
  language: Yup.string().required('Required'),
})

const actorsValidationSchema = Yup.object({
  actors: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Required').min(3).max(255),
        image: Yup.mixed().required('Required'),
        birthday: Yup.string().required('Required'),
        birthplace: Yup.string().required('Required'),
        biography: Yup.string().required('Required'),
        nationality: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
      })
    )
    .min(1),
})

const directorsValidationSchema = Yup.object({
  directors: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Required').min(3).max(255),
        image: Yup.mixed().required('Required'),
        birthday: Yup.string().required('Required'),
        birthplace: Yup.string().required('Required'),
        biography: Yup.string().required('Required'),
        nationality: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
      })
    )
    .min(1),
})

let initialValues = {
  title: '',
  synopsis: '',
  genres: [],
  age_restriction: '',
  images: [],
  trailer_url: '',
  release_year: '',
  duration: '',
  international_rating: '',
  country: '',
  language: '',
  actors: [cast],
  directors: [cast],
}

const AddNewMovie = ({ handleCloseModal, paginationModel, movieId }) => {
  const [posters, setPosters] = useState([])

  const { openMovieSnackbar } = useMovieSnackbar()

  const queryClient = useQueryClient()
  const newMovieMutation = useMutation({
    mutationFn: movieId ? (values) => updateMovie(movieId, values) : addMovie,
    onMutate: (values) => {
      console.log('[AddNewMovie] newMovieMutation.onMutate', values)
    },
    onSuccess: (data) => {
      console.log('[AddNewMovie] newMovieMutation.onSuccess', data)
      movieId
        ? queryClient.invalidateQueries([
            'movies',
            { page: paginationModel.page, pageSize: paginationModel.pageSize },
          ])
        : queryClient.setQueryData(
            [
              'movies',
              { page: paginationModel.page, size: paginationModel.pageSize },
            ],
            data.data
          )
      openMovieSnackbar(data.message, 'success')
      setTimeout(() => {
        setPosters([])
        handleCloseModal()
      }, 1000)
    },
    onError: (error) => {
      console.log(
        '[AddNewMovie] newMovieMutation.onError',
        error.response.data.message
      )
      openMovieSnackbar(error.response.data.message, 'error')
    },
  })

  const handleSubmitMovie = (values) => {
    console.log('[AddNewMovie] handleSubmitMovie', values)
    // newMovieMutation.mutate(values)
  }

  const handleSubmitActors = (values) => {
    console.log('[AddNewMovie] handleSubmitActors', [...values.actors])
    // newActorMutation.mutate([...values.actors])
  }

  const handleSubmitDirectors = (values) => {
    console.log('[AddNewMovie] handleSubmitDirectors', [...values.directors])
    // newDirectorMutation.mutate([...values.directors])
  }

  //get movie by id
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['movies', movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !!movieId,
  })

  if (movieId) {
    if (isLoading) return <CircularProgress />

    if (error)
      return <Alert severity='error'>{error.response.data.message}</Alert>

    if (isSuccess) {
      const movie = data.data
      initialValues = {
        title: movie.title,
        synopsis: movie.synopsis,
        genres: [...movie.genres.map((genre) => genre.id)],
        age_restriction: movie.age_restriction,
        images: movie.images,
        trailer_url: movie.trailer_url,
        release_year: movie.release_year,
        duration: movie.duration,
        international_rating: movie.international_rating,
        country: movie.country,
        language: movie.language,
        actors: [
          ...movie.actors.map((actor) => ({
            name: actor.name,
            image: null,
            birthday: actor.birthday,
            birthplace: actor.birthplace,
            biography: actor.biography,
            nationality: actor.nationality,
            gender: actor.gender,
            id: actor.id,
          })),
        ],
        directors: movie.directors,
      }
    }
  }

  return (
    <>
      <AppBar
        position='absolute'
        color='default'
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            Add Movie
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <MultiStepForm
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log('[AddNewMovie] onSubmit', values)
              newMovieMutation.mutate(values)
            }}
            movieMutation={newMovieMutation}
          >
            {/* Movie Details */}
            <FormStep
              stepName='Movie Details'
              onSubmit={handleSubmitMovie}
              validationSchema={movieValidationSchema}
            >
              <MovieDetails posters={posters} setPosters={setPosters} />
            </FormStep>

            {/* Movie Actors */}
            <FormStep
              stepName='Movie Actors'
              validationSchema={actorsValidationSchema}
              onSubmit={handleSubmitActors}
            >
              <MovieActors cast={cast} />
            </FormStep>

            {/* Movie Directors */}
            <FormStep
              stepName='Movie Directors'
              validationSchema={directorsValidationSchema}
              onSubmit={handleSubmitDirectors}
            >
              <MovieDirectors cast={cast} />
            </FormStep>
          </MultiStepForm>
        </Paper>
      </Container>
    </>
  )
}

AddNewMovie.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  paginationModel: PropTypes.object.isRequired,
  movieId: PropTypes.number,
}

export default AddNewMovie
