import { Route, Routes } from 'react-router-dom'
import AuthLayout from './pages/auth/AuthLayout'
import RegisterPage from './pages/auth/RegisterPage'
import SignInPage from './pages/auth/SignInPage'
import Home from './pages/main/Home'

export default function App() {
  return (
    <Routes>
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='register' element={<RegisterPage />} />
        <Route path='signin' element={<SignInPage />} />
      </Route>

      <Route path='/' element={<Home />} />
    </Routes>
  )
}
