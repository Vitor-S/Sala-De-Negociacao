import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'

import GlobalStyle from './styles/globalStyle'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'
import Search from './views/Search'
import Profile from './views/Profile'
import Error from './views/Error'
import Chat from './views/Chat'
import Footer from './components/Footer'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/chat' element={<Chat/>} />
                <Route path='*' element={<Error/>}></Route>
            </Routes>
            <GlobalStyle />
        </Router>
    )
}
