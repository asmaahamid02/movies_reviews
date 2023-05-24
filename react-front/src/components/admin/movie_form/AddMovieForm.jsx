import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import MovieActors from './MovieActors'
import MovieDetails from './MovieDetails'
import MovieDirectors from './MovieDirectors'

const steps = ['Movie Details', 'Movie Actors', 'Movie Directors']

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <MovieDetails />
    case 1:
      return <MovieActors />
    case 2:
      return <MovieDirectors />
    default:
      throw new Error('Unknown step')
  }
}

const AddMovieForm = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
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
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Typography variant='h5' gutterBottom>
              Movie added successfully
            </Typography>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant='contained'
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Add' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  )
}

export default AddMovieForm
