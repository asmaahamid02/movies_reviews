import UserDashboard from './user/UserDashboard'
import AdminDashboard from './admin/AdminDashboard'
import useAdmin from '../hooks/useAdmin'

const Dashboard = () => {
  const { admin } = useAdmin()

  return admin ? <AdminDashboard /> : <UserDashboard />
}

export default Dashboard
