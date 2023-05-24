import { Box, IconButton, Modal } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useState } from 'react'
import AddMovieForm from './movie_form/AddMovieForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const AddMovie = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <IconButton
        color='secondary'
        aria-label='add movie'
        size='large'
        onClick={handleOpen}
      >
        <AddCircle />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box id='modal-modal-description'>
            {/* multi step form */}
            <AddMovieForm />
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddMovie
