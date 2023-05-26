import { Box, IconButton, Modal } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useState } from 'react'
import AddNewMovie from './movie/AddNewMovie'
import PropTypes from 'prop-types'
import { modalStyle } from '../../utils/constants.utils'

const AddMovie = ({ paginationModel }) => {
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
        <Box sx={modalStyle}>
          <Box id='modal-modal-description'>
            {/* multi step form */}
            <AddNewMovie
              handleCloseModal={handleClose}
              paginationModel={paginationModel}
            />
          </Box>
        </Box>
      </Modal>
    </>
  )
}

AddMovie.propTypes = {
  paginationModel: PropTypes.object.isRequired,
}

export default AddMovie
