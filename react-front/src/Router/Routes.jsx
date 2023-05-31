import { Routes, Route, Navigate } from 'react-router-dom'

import Auth from '../pages/Auth'
import UsersList from '../components/admin/UsersList'
import MoviesList from '../components/admin/MoviesList'
import Home from '../pages/Home'
import PrivateRoutes from './PrivateRoutes'
import NotFoundPage from '../pages/errors/NotFoundPage'
import NotAuthorized from '../pages/errors/NotAuthorized'
import Dashboard from '../components/Dashboard'
import SingleMovie from '../pages/SingleMovie'
import FormGenerator from '../components/admin/FormGenerator'
import AllForms from '../components/admin/AllForms'
import SingleForm from '../pages/SingleForm'

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
          <Route path='/form-generator' element={<FormGenerator />} />
          <Route path='/forms' element={<AllForms />} />
        </Route>
        <Route path='/forms/:formId' element={<SingleForm />} />
      </Route>

      {/* user routes */}
      <Route element={<PrivateRoutes allowedRoles={['user']} />}>
        <Route path='/movie/:movieId' element={<SingleMovie />} />
      </Route>

      {/* error routes */}
      <Route path='/unauthorized' element={<NotAuthorized />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default MainRoutes
