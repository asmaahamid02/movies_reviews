import { useEffect, useState } from 'react'

const useAdmin = () => {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.roles?.includes('admin')) {
      setAdmin(true)
    }
  }, [])

  return { admin }
}

export default useAdmin
