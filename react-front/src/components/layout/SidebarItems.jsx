import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import MovieIcon from '@mui/icons-material/Movie'
import { ListItem } from '@mui/material'
import { Link } from 'react-router-dom'

export const mainListItems = (
  <>
    <ListItem component={Link} to='/home'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>

      <ListItemText primary='Dashboard' />
    </ListItem>
    <ListItem component={Link} to='/users'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='Users' />
    </ListItem>
    <ListItem component={Link} to='/movies'>
      <ListItemIcon>
        <MovieIcon />
      </ListItemIcon>
      <ListItemText primary='Movies' />
    </ListItem>
  </>
)
