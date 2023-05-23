import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login, register } from '../services/user.service'
import { CircularProgress, IconButton, InputAdornment } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const { updateUser } = useAuth()
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3)
      .max(255)
      .when('isLogin', {
        is: false,
        then: Yup.string().required('Required'),
      }),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required')
      .max(255),
    password: Yup.string().required('Required').min(8),
  })

  const { mutate, isError, isLoading, isSuccess, error } = useMutation({
    mutationFn: isLogin ? login : register,
    onSuccess: (data) => {
      console.log('[Login/Register Success]: ', data)
      updateUser(data.data)
      //navigate to dashboard
      navigate('/dashboard')
    },
    onError: (error) => {
      console.log('[Login/Register Error]: ', error)
    },
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isLogin) {
        mutate({
          email: values.email,
          password: values.password,
        })
      } else {
        mutate({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      }
    },
  })

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/*Login or Register*/}
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Grid item>
            <Link
              href='#'
              variant='body2'
              sx={{ color: isLogin ? 'secondary.main' : 'primary.main' }}
              onClick={() => setIsLogin(true)}
            >
              SIGN-IN
            </Link>
          </Grid>
          <Grid item>
            <Link
              href='#'
              variant='body2'
              sx={{ color: isLogin ? 'primary.main' : 'secondary.main' }}
              onClick={() => setIsLogin(false)}
            >
              SIGN-UP
            </Link>
          </Grid>
        </Grid>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {isSuccess ? (
            //lock open icon
            <LockOpenIcon />
          ) : (
            <LockOutlinedIcon />
          )}
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          {/*Name field*/}
          {!isLogin && (
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              autoComplete='name'
              autoFocus
              type='text'
              {...formik.getFieldProps('name')}
              {...(formik.touched.name &&
                formik.errors.name && {
                  error: true,
                  helperText: formik.errors.name,
                })}
            />
          )}

          {/*Email field*/}
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='email'
            autoFocus
            type='email'
            {...formik.getFieldProps('email')}
            {...(formik.touched.email &&
              formik.errors.email && {
                error: true,
                helperText: formik.errors.email,
              })}
          />

          {/*Password field*/}
          <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            label='Password'
            autoComplete='current-password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps('password')}
            {...(formik.touched.password &&
              formik.errors.password && {
                error: true,
                helperText: formik.errors.password,
              })}
          />
          {isLoading ? (
            //center the spinner
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
                mb: 2,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
          )}
          <Link href='#' variant='body2' onClick={() => setIsLogin(false)}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>

        {/*Error/Success msg*/}
        {isError && (
          <Typography
            component='small'
            variant='body2'
            sx={{ color: 'red', mt: 2 }}
          >
            {error.response.data.message}
          </Typography>
        )}
        {isSuccess && (
          <Typography
            component='small'
            variant='body2'
            sx={{ color: 'green', mt: 2 }}
          >
            Login successful!
          </Typography>
        )}
      </Box>
    </Container>
  )
}

export default Auth
