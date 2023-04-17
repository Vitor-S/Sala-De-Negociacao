import React from 'react'
import { Link } from 'react-router-dom'

import { StyledHeader } from '../styles/components-styles'

export default function Header() {
  return (
    <StyledHeader>
        <div className="left-links">
            <Link to='/'>Home</Link>
            <Link to='/search'>Pesquisar</Link>
            <Link to='/profile' state={{}}>Perfil</Link>
        </div>
            <a className='logout-link' onClick={() => console.log('ok')}>Sair</a>
    </StyledHeader>
  )
}
