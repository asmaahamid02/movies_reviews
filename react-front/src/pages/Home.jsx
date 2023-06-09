import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from '../components/layout/Sidebar'
import MainContent from '../components/layout/MainContent'
import LogoutIcon from '@mui/icons-material/Logout'
import useAuth from '../hooks/useAuth'
import useAdmin from '../hooks/useAdmin'
import { Alert, Snackbar } from '@mui/material'
import useMovieSnackbar from '../hooks/useMovieSnackbar'
import { Close as CloseIcon } from '@mui/icons-material'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Home = () => {
  const [open, setOpen] = React.useState(true)
  const { admin } = useAdmin()

  const [appbarTitle, setAppbarTitle] = React.useState(
    admin ? 'Dashboard' : 'Home Page'
  )
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const { logoutUser } = useAuth()

  const { movieSnackbar, closeMovieSnackbar } = useMovieSnackbar()

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='absolute' open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {appbarTitle}
          </Typography>
          <IconButton color='inherit' onClick={logoutUser}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar
        open={open}
        toggleDrawer={toggleDrawer}
        setAppbarTitle={setAppbarTitle}
      />
      <Box
        component='main'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          <MainContent />
        </Container>
      </Box>
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
    </Box>
  )
}

export default Home
