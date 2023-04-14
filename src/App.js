import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'

import GlobalStyle from './styles/globalStyle'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
            </Routes>
            <GlobalStyle />
        </Router>
    )
}
