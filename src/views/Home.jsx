import React from 'react'

//components
import Card from '../components/Card'
import SideBar from '../components/SideBar'
import SearchView from '../components/SearchView'

//styles
import { StyledHome } from '../styles/styles'

export default function Home() {
  return (
    <StyledHome>
        <div className="home-container">
            <SideBar/>
            <SearchView/>
        </div>
    </StyledHome>
  )
}
