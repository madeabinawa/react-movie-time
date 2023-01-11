import { useEffect } from 'react'
import { Layout } from './components'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Auth'
import { useSelector, useDispatch } from 'react-redux'
import { authLogin, authLogout } from './store/authSlice'
import AppRoutes from './routes/Routes'
import { SearchResults, ListMovie, DetailMovie } from './pages/Movies/'
import { NotFound } from './pages/404'

import './App.css'

function App() {
  const dispatch = useDispatch()
  const storageToken = localStorage.getItem('token')
  const { token } = useSelector((state) => state.auth)

  const checkAuth = () => {
    if (!storageToken) return dispatch(authLogout())

    return dispatch(authLogin({ token: storageToken }))
  }

  useEffect(() => {
    checkAuth()
  }, [storageToken, token])

  const ProtectedRoutes = () => {
    return (
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to='/movies' replace />} />
          <Route path='/login' element={<Navigate to='/movies' replace />} />
          <Route path='/movies' element={<ListMovie />} />
          <Route path='/movies/detail/:id' element={<DetailMovie />} />
          <Route path='/movies/search' element={<SearchResults />} />

          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </Layout>
    )
  }

  const PublicRoutes = () => {
    return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    )
  }

  return <AppRoutes component={token ? ProtectedRoutes : PublicRoutes} />
}

export default App
