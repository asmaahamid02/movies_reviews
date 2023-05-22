import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))

    if (userData) {
      setUser(userData)
    }
  }, [])

  const updateUser = (data) => {
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('user')
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
