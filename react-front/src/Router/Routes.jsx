import { Routes, Route, Navigate } from 'react-router-dom'

import Auth from '../pages/Auth'
import UsersList from '../components/admin/UsersList'
import MoviesList from '../components/admin/MoviesList'
import Home from '../pages/Home'
import PrivateRoutes from './PrivateRoutes'
import NotFoundPage from '../pages/errors/NotFoundPage'
import NotAuthorized from '../pages/errors/NotAuthorized'
import Dashboard from '../components/Dashboard'
import SingleMovie from '../components/user/SingleMovie'

const MainRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path='/auth' exact element={<Auth />} />

      {/* admin and user routes */}
      <Route
        path='/'
        element={<PrivateRoutes allowedRoles={['admin', 'user']} />}
      >
        <Route path='/' element={<Home />}>
          <Route path='/' element={<Navigate replace to='home' />} />
          <Route path='/home' element={<Dashboard />} />
        </Route>
      </Route>

      {/* admin routes */}
      <Route element={<PrivateRoutes allowedRoles={['admin']} />}>
        <Route path='/' element={<Home />}>
          <Route path='/users' element={<UsersList />} />
          <Route path='/movies' element={<MoviesList />} />
        </Route>
      </Route>

      {/* user routes */}
      <Route element={<PrivateRoutes allowedRoles={['user']} />}>
        <Route path='/' element={<Home />}>
          <Route path='/movie/:movieId' element={<SingleMovie />} />
        </Route>
      </Route>

      {/* error routes */}
      <Route path='/unauthorized' element={<NotAuthorized />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default MainRoutes
