import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import PropTypes from 'prop-types'

const PrivateRoutes = ({ allowedRoles }) => {
  const { user } = useAuth()
  const location = useLocation()

  return user?.roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.token ? (
    <Navigate replace to='/unauthorized' state={{ from: location }} />
  ) : (
    <Navigate replace to='/auth' state={{ from: location }} />
  )
}

PrivateRoutes.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PrivateRoutes
