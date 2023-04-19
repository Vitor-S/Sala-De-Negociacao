import React, { useEffect } from 'react'

//components
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'

//styles
import { StyledHome } from '../styles/styles'

export default function Home() {
    
    const navigate = useNavigate()

    return (
        <StyledHome>
            <Header/>
            <div className="home-container">
                Home
            </div>
        </StyledHome>
    )
}
