import React from 'react'

//components
import Header from '../components/Header'

//styles
import { StyledHome } from '../styles/styles'

export default function Home() {
  return (
    <StyledHome>
        <Header/>
        <div className="home-container">
        </div>
    </StyledHome>
  )
}
