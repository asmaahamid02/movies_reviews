import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteForm, getForms } from '../../services/form.service'
import { Link } from 'react-router-dom'
import { Box } from '@mui/system'
import { useState } from 'react'
import useMovieSnackbar from '../../hooks/useMovieSnackbar'

const AllForms = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const closeDialog = () => setOpenDialog(false)
  const [selectedId, setSelectedId] = useState(null)

  const { openMovieSnackbar } = useMovieSnackbar()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['forms'],
    queryFn: getForms,
  })

  const queryClient = useQueryClient()
  const removeFormMutation = useMutation({
    mutationFn: () => deleteForm(selectedId),
    onError: (error) => openMovieSnackbar(error.response.data.message, 'error'),
    onSuccess: () => {
      queryClient.invalidateQueries(['forms'])
      openMovieSnackbar('Form deleted successfully', 'success')
    },
  })

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )

  if (isError)
    return <Alert severity='error'>{error.response.data.message}</Alert>

  return (
    <>
      <Box>
        <List dense={false}>
          {data?.data?.map((form) => (
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              key={form.id}
            >
              <ListItem component={Link} to={`/forms/${form.id}`}>
                <ListItemText primary={form.title} />
              </ListItem>
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={() => {
                  setSelectedId(form.id)
                  setOpenDialog(true)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </List>
      </Box>

      <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Delete Form Confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do you want to delete this form?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Disagree</Button>
          <Button
            onClick={() => {
              removeFormMutation.mutate()
              closeDialog()
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AllForms
