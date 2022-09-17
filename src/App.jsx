import { useState } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import Header from './components/Header/Header'
import './App.css'
import Home from './containers/Home/Home'
import Login from './containers/User/Login/Login'
import Pokemon from './containers/Pokemon/Pokemon'
import Profile from './containers/User/Profile/Profile'
import Signup from './containers/User/Signup/Signup'

function App() {

  return (
    <div className='app'>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/pokemon' element={<Pokemon/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
