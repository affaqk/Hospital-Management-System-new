import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ allowedRole, redirectTo, children }) => {
  const role = localStorage.getItem('role')
  if (role !== allowedRole) {
    return <Navigate to={redirectTo} replace />
  }
  return children
}

export default ProtectedRoute
