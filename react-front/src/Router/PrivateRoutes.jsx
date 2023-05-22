import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const auth = { token: true }
  return auth.token ? <Outlet /> : <Navigate replace to='/auth' />
}

export default PrivateRoutes
