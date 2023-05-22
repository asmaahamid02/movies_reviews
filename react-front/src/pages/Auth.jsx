import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState } from 'react'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    })
  }

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/*Name field*/}
          {!isLogin && (
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              autoFocus
              type='text'
            />
          )}

          {/*Email field*/}
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            type='email'
          />

          {/*Password field*/}
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href='#' variant='body2' onClick={() => setIsLogin(false)}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Auth
