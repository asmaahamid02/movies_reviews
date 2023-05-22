import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const auth = { token: true }
  return auth.token ? <Outlet /> : <Navigate replace to='/login' />
}

export default PrivateRoutes
