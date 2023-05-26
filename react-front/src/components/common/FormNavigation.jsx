import { Box, Button } from '@mui/material'
import PropTypes from 'prop-types'

const FormNavigation = ({
  hasPrevious,
  onBackClick,
  isLastStep,
  isSubmitting,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {hasPrevious && (
        <Button onClick={onBackClick} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
      )}

      <Button
        type='submit'
        color='primary'
        variant='contained'
        sx={{ mt: 3, ml: 1 }}
        disabled={isSubmitting}
      >
        {isLastStep ? 'Add' : 'Next'}
      </Button>
    </Box>
  )
}

FormNavigation.propTypes = {
  hasPrevious: PropTypes.bool.isRequired,
  onBackClick: PropTypes.func.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default FormNavigation
