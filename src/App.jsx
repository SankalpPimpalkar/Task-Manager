import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './pages/main/MainLayout'
import Home from './pages/main/Home'
import Profile from './pages/main/Profile'
import EditProfile from './pages/main/EditProfile'
import AuthLayout from './pages/auth/AuthLayout'
import Register from './pages/auth/Register'
import SignIn from './pages/auth/SignIn'

export default function App() {
  return (
    <Routes>
      <Route path='/auth' element={<AuthLayout/>}>
        <Route path='register' element={<Register/>} />
        <Route path='signin' element={<SignIn/>} />
      </Route>

      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />

        <Route path='profile' element={<Profile />} />
        <Route path='edit-profile' element={<EditProfile />} />
      </Route>
    </Routes>
  )
}
