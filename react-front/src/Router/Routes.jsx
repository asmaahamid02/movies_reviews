import { Routes, Route, Navigate } from 'react-router-dom'

import Auth from '../pages/Auth'
import Dashboard from '../components/admin/Dashboard'
import Users from '../components/admin/Users'
import Movies from '../components/admin/Movies'
import Home from '../pages/Home'
import PrivateRoutes from './PrivateRoutes'
import NotFoundPage from '../pages/NotFoundPage'

const MainRoutes = () => (
  <Routes>
    <Route path='/auth' element={<Auth />} />
    <Route element={<PrivateRoutes />}>
      <Route path='/' element={<Home />}>
        <Route path='/' element={<Navigate replace to='dashboard' />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/movies' element={<Movies />} />
      </Route>
    </Route>

    <Route path='*' element={<NotFoundPage />} />
  </Routes>
)

export default MainRoutes
