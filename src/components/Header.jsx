import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { StyledHeader } from '../styles/components-styles'
import { Api, auth } from '../service/Api'
import HandshakeIcon from '@mui/icons-material/Handshake';

import { onAuthStateChanged } from 'firebase/auth'

export default function Header() {

    const navigate = useNavigate()

    const [userLogged, setUserLogged] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (!user) navigate('/login')
          else setUserLogged(user)
        });
      }, [])

    return (userLogged != null && userLogged != undefined) ? (
        <StyledHeader>
                <div className="header-logo">
                    <HandshakeIcon fontSize='large' sx={{ color: '#fff' }}/>
                    <span>Sala de Negociação</span>
                </div>
                <div className="header-links">
                    <Link to='/'>Início</Link>
                    <Link to='/search'>Pesquisar</Link>
                    <Link to={`/profile/${userLogged.uid}`}>Perfil</Link>
                    <a className='logout-link' onClick={() => Api.signOut(navigate)}>Sair</a>
                </div>
        </StyledHeader>
    ) : null
}
