import React, { useEffect } from 'react'
import { auth } from '../service/Api'

//components
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'

//styles
import { StyledHome } from '../styles/styles'

export default function Home() {

    const { state } = useLocation()
    
    const navigate = useNavigate()

    useEffect(() => {
        // if(!auth.currentUser) navigate('/login')
    }, [])

    return (
        <StyledHome>
            <Header />
            <div className="home-container">
                Home
            </div>
        </StyledHome>
    )
}
