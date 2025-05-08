import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './pages/main/MainLayout'
import Home from './pages/main/Home'
import Profile from './pages/main/Profile'
import EditProfile from './pages/main/EditProfile'
import AuthLayout from './pages/auth/AuthLayout'
import Register from './pages/auth/Register'
import SignIn from './pages/auth/SignIn'
import AssignedTasks from './pages/main/AssignedTasks'
import Projects from './pages/main/Projects'
import Project from './pages/main/Project'

export default function App() {
  return (
    <Routes>
      <Route path='/auth' element={<AuthLayout/>}>
        <Route path='register' element={<Register/>} />
        <Route path='signin' element={<SignIn/>} />
      </Route>

      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='assigned' element={<AssignedTasks />} />
        <Route path='projects' element={<Projects />} />
        <Route path='projects/:id' element={<Project />} />

        <Route path='profile/:id' element={<Profile />} />
        <Route path='edit-profile' element={<EditProfile />} />
      </Route>
    </Routes>
  )
}
