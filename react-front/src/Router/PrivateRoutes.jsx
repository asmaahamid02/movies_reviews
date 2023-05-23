import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PrivateRoutes = () => {
  const { user } = useAuth()
  return user?.token ? <Outlet /> : <Navigate replace to='/auth' />
}

export default PrivateRoutes
