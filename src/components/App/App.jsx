import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Loader from '../Loader/Loader';
import UserMenu from '../UserMenu/UserMenu';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import { useGetUserQuery } from '../../redux/users/users-reducer';
import { onError } from '../../utilits/toast';
import PublicRoute from '../PublicRoute/PublicRoute';
import PrivateRoute from '../PrivatRoute/PrivetRoute';

const ContactsPage = lazy(() => import('../../pages/ContactsPage'))

export default function App() {
  const { error } = useGetUserQuery()

  useEffect(() => {
    if (error) {
      onError(error.data)
    }
  }, [error])

  return (
    <div className="App">
      <Suspense fallback={<p>Loading.... <Loader/></p>} >
        <Routes>
          <Route path="/" element={<UserMenu />}>
            <Route
              path="login"
              element={
                <PublicRoute
                  element={<LoginPage/>}
                  redirectTo="/contacts"
                  restricted
                />
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute
                  element={<RegisterPage />}
                  redirectTo="/contacts"
                  restricted
                />
              }
            />
            <Route
              path="contacts/*"
              element={
                <PrivateRoute element={<ContactsPage />} redirectTo="/login" />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  )
}