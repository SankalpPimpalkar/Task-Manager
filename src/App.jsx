import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router'
import AuthContextProvider from './context/AuthProvider'

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  )
}
