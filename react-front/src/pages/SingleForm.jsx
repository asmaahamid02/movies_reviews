import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Radio,
  TextField,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getFormById } from '../services/form.service'

const SingleForm = () => {
  const { formId } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['forms', formId],
    queryFn: () => getFormById(formId),
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

  {
    const formData = data?.data

    return (
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component='h1' variant='h4' align='center' sx={{ mb: 2 }}>
            {formData.title}
          </Typography>
          <form>
            {formData?.fields?.map((field) => {
              return (
                <Box sx={{ mb: 2 }} key={field.name}>
                  {field.type === 'radio' ? (
                    <FormControlLabel
                      control={<Radio name={field.name} value={field.value} />}
                      label={field.label}
                    />
                  ) : field.type === 'checkbox' ? (
                    <FormControlLabel
                      control={<Checkbox name={field.name} />}
                      label={field.label}
                    />
                  ) : field.type === 'submit' || field.type === 'reset' ? (
                    <Button
                      color='primary'
                      type={field.type}
                      variant='contained'
                      fullWidth
                    >
                      {field.name}
                    </Button>
                  ) : (
                    <TextField
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      fullWidth
                      {...(field.required && 'required')}
                    />
                  )}
                </Box>
              )
            })}
          </form>
        </Paper>
      </Container>
    )
  }
}

export default SingleForm
