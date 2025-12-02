import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register';

import './styles.css'
import Linktree from "./pages/Linktree";

<Route path="/linktree" element={<Linktree />} />


function App(){
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/linktree" element={<Linktree />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={ token ? <Home/> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? '/home' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
