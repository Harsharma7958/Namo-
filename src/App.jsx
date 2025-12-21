import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Counter from './pages/Counter'
import About from './pages/About'
import Contact from './pages/Contact'
import Developer from './pages/Developer'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/developer' element={<Developer />} />
      </Routes>
    </>
  )
}

export default App
