import {
  Alert,
  CircularProgress,
  IconButton,
  Link,
  Snackbar,
  Typography,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getMovies } from '../../services/movie.service'
import AddMovie from './AddMovie'
import useMovieSnackbar from '../../hooks/useMovieSnackbar'

const MoviesList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 5,
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      'movies',
      { page: paginationModel.page, pageSize: paginationModel.pageSize },
    ],
    keepPreviousData: true,
    queryFn: () => getMovies(paginationModel.page, paginationModel.pageSize),
  })

  const [rowCount, setRowCount] = useState(data?.data?.total || 0)

  const { movieSnackbar, closeMovieSnackbar } = useMovieSnackbar()

  useEffect(() => {
    setRowCount((prevCount) => data?.data?.total || prevCount)
  }, [data?.data?.total, paginationModel])

  if (isError) {
    return <Alert severity='error'>{error.response.data.message}</Alert>
  }

  if (isLoading) return <CircularProgress />

  const rows =
    data?.data?.movies?.map((movie) => ({
      id: movie.id,
      title: movie.title,
      release_year: movie.release_year,
      age_restriction: movie.age_restriction,
      duration: movie.duration,
      international_rating: movie.international_rating,
      country: movie.country,
      language: movie.language,
      trailer_url: movie.trailer_url,
    })) || []

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 230,
    },
    {
      field: 'release_year',
      headerName: 'Release Year',
    },
    {
      field: 'age_restriction',
      headerName: 'Age Restriction',
    },
    {
      field: 'duration',
      headerName: 'Duration',
      valueGetter: (params) => {
        return `${params.row.duration} min`
      },
    },
    {
      field: 'international_rating',
      headerName: 'International Rating',
      valueGetter: (params) => {
        return `${params.row.international_rating} / 10`
      },
    },
    {
      field: 'country',
      headerName: 'Country',
    },
    {
      field: 'language',
      headerName: 'Language',
    },
    {
      field: 'trailer_url',
      headerName: 'Trailer',
      renderCell: (params) =>
        params.row.trailer_url ? (
          <Link href={params.row.trailer_url} target='_blank' color='secondary'>
            open
          </Link>
        ) : (
          <Typography component='p' sx={{ color: 'red' }}>
            None
          </Typography>
        ),
    },
  ]

  return (
    <div>
      <AddMovie paginationModel={paginationModel} />
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={isLoading}
        pageSizeOptions={[5, 10, 15, 20, 25, 30]}
        checkboxSelection
        paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        components={{
          Toolbar: GridToolbar,
        }}
      />

      {/* Snackbars */}
      <Snackbar
        open={movieSnackbar.open}
        autoHideDuration={3000}
        onClose={closeMovieSnackbar}
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={closeMovieSnackbar}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        <Alert onClose={closeMovieSnackbar} severity={movieSnackbar.severity}>
          {movieSnackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default MoviesList
