import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Modal,
  Snackbar,
  Typography,
} from '@mui/material'
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { deleteMovie, getMovies } from '../../services/movie.service'
import AddMovie from './AddMovie'
import useMovieSnackbar from '../../hooks/useMovieSnackbar'
import AddNewMovie from './movie/AddNewMovie'
import { modalStyle } from '../../utils/constants.utils'

const MoviesList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 5,
  })

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  const closeDialog = () => setOpenDialog(false)

  const [openModal, setOpenModal] = useState(false)
  const closeModal = () => setOpenModal(false)

  const { movieSnackbar, closeMovieSnackbar, openMovieSnackbar } =
    useMovieSnackbar()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      'movies',
      { page: paginationModel.page, pageSize: paginationModel.pageSize },
    ],
    keepPreviousData: true,
    queryFn: () => getMovies(paginationModel.page, paginationModel.pageSize),
  })

  const [rowCount, setRowCount] = useState(data?.data?.total || 0)

  const queryClient = useQueryClient()
  const deleteMovieMutation = useMutation({
    mutationFn: (id) => deleteMovie(id),

    onSuccess: () => {
      //refresh the data
      queryClient.invalidateQueries([
        'movies',
        { page: paginationModel.page, pageSize: paginationModel.pageSize },
      ])
      openMovieSnackbar('Movie deleted successfully', 'success')
    },
    onError: (error) => {
      openMovieSnackbar(error.response.data.message, 'error')
    },
  })

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
      delete: movie.id,
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
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: (params) => (
        <IconButton
          color='error'
          aria-label='delete'
          onClick={() => {
            // deleteMovieMutation.mutate(params.row.delete)
            setOpenDialog(true)
            setSelectedMovieId(params.row.delete)
          }}
        >
          <DeleteIcon />
        </IconButton>
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
        paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        components={{
          Toolbar: GridToolbar,
        }}
        onRowDoubleClick={(params) => {
          setOpenModal(true)
          setSelectedMovieId(params.row.id)
        }}
      />
      <Modal open={openModal} onClose={closeModal}>
        <Box sx={modalStyle}>
          <Box id='modal-modal-description'>
            {/* multi step form */}
            <AddNewMovie
              handleCloseModal={closeModal}
              paginationModel={paginationModel}
              movieId={selectedMovieId}
            />
          </Box>
        </Box>
      </Modal>

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

      <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Delete Movie Confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do you want to delete this movie?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Disagree</Button>
          <Button
            onClick={() => {
              deleteMovieMutation.mutate(selectedMovieId)
              closeDialog()
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MoviesList
