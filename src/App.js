import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'

import GlobalStyle from './styles/globalStyle'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'
import Test from './views/Test'
import Search from './views/Search'
import Profile from './views/Profile'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/search' element={<Search />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/ytb' component={() => {
                    window.location.href = 'https://youtube.com/';
                    return null;
                }}/>

                <Route path='/test' element={<Test />} />
            </Routes>
            <GlobalStyle />
        </Router>
    )
}
