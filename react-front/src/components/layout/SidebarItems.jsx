import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import MovieIcon from '@mui/icons-material/Movie'
import FeedIcon from '@mui/icons-material/Feed'
import { ListItem } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useAdmin from '../../hooks/useAdmin'

const MainListItems = ({ setAppbarTitle }) => {
  const { admin } = useAdmin()

  return admin ? (
    <>
      <ListItem
        component={Link}
        to='/home'
        onClick={() => setAppbarTitle('Dashboard')}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>

        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem
        component={Link}
        to='/users'
        onClick={() => setAppbarTitle('Users')}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Users' />
      </ListItem>
      <ListItem
        component={Link}
        to='/movies'
        onClick={() => setAppbarTitle('Movies')}
      >
        <ListItemIcon>
          <MovieIcon />
        </ListItemIcon>
        <ListItemText primary='Movies' />
      </ListItem>
      <ListItem
        component={Link}
        to='/form-generator'
        onClick={() => setAppbarTitle('Form Generator')}
      >
        <ListItemIcon>
          <FeedIcon />
        </ListItemIcon>
        <ListItemText primary='Form Generator' />
      </ListItem>
      <ListItem
        component={Link}
        to='/forms'
        onClick={() => setAppbarTitle('All Forms')}
      >
        <ListItemIcon>
          <FeedIcon />
        </ListItemIcon>
        <ListItemText primary='All Form' />
      </ListItem>
    </>
  ) : (
    <>
      <ListItem
        component={Link}
        to='/home'
        onClick={() => setAppbarTitle('Home Page')}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>

        <ListItemText primary='Home Page' />
      </ListItem>
    </>
  )
}

MainListItems.propTypes = {
  setAppbarTitle: PropTypes.func.isRequired,
}

export default MainListItems
