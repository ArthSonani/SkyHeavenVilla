import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Experience from './pages/Experience'
import BookContact from './pages/BookContact'
import Nav from './components/Nav'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/book' element={<BookContact />} />
      </Routes>
    </BrowserRouter>
  )
}
