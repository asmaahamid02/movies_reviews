import useAuth from '../hooks/useAuth'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './admin/AdminDashboard'

const Dashboard = () => {
  const { user } = useAuth()
  const roles = user?.roles

  return roles.includes('admin') ? <AdminDashboard /> : <UserDashboard />
}

export default Dashboard
