import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const PrivateRoutes = () => {
  const { user } = useContext(UserContext)
  return user?.token ? <Outlet /> : <Navigate replace to='/auth' />
}

export default PrivateRoutes
