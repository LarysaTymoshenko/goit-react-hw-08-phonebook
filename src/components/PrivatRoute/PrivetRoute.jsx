import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { authUser } from '../../redux/auth/auth-selector'
import { onError } from '../../utilits/toast'

export default function PrivateRoute({ element, redirectTo }) {
  const auth = useSelector(authUser)
  if (!redirectTo) {
    onError('No path for redirect')
    return <Navigate to="/" />
  }
  return <>{auth ? element : <Navigate to={redirectTo} />}</>
}