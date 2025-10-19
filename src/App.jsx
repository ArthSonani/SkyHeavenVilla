import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Stay from './pages/Stay'
import Reservation from './pages/Reservation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/stay' element={<Stay />} />
        <Route path='/reservation' element={<Reservation />} />
      </Routes>
    </BrowserRouter>
  )
}
