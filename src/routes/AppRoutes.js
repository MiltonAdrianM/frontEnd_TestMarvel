import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import App from '../App';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/appMarvel" element={<App />} />
      </Routes>
     </BrowserRouter>
  )
}

export default AppRoutes