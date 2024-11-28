import { useEffect } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './rdUser'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ allowedRoles, children, GetUser, userState }) => {
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  useEffect(() => {
    if (allowedRoles.length !== 0 && !token) {
      navigate('/auth/login')
    } else {
      if (!userState.status) {
        GetUser()
      } else {
        if (userState.data.status) {
          if (allowedRoles.length !== 0 && !allowedRoles.includes(userState.data.data.nameRole)) {
            if (userState.data.data.nameRole === 'CUSTOMER') {
              navigate('/')
            } else {
              navigate('/management')
            }
          }
        }
      }
    }
    return () => {}
  }, [GetUser, allowedRoles, navigate, token, userState])

  return !userState.loading && children
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
