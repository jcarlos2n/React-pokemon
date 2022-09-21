
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import './App.css'
import Home from './containers/Home/Home'
import Login from './containers/User/Login/Login'
import Pokemon from './containers/Pokemon/Pokemon'
import Profile from './containers/User/Profile/Profile'
import Signup from './containers/User/Signup/Signup'
import Update from './containers/User/Update/Update'

function App() {

  return (
    <div className='app'>
      <HashRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/pokemon' element={<Pokemon />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </HashRouter>
     
    </div>
  )
}

export default App
