import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api.service'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const setToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))

    if (userData) {
      setUser(userData)
      setToken(userData.token)
    }
  }, [])

  const updateUser = (data) => {
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
    setToken(data.token)
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/auth', { replace: true })
  }

  return (
    <UserContext.Provider value={{ user, logoutUser, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserContext, UserProvider }
