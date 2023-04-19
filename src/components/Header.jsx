import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { StyledHeader } from '../styles/components-styles'
import { Api, auth } from '../service/Api'

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

    return (
        <StyledHeader>
            {
                (userLogged != null && userLogged != undefined) ? 
                <div className="left-links">
                    <Link to='/'>Home</Link>
                    <Link to='/search'>Pesquisar</Link>
                    <Link to={`/profile/${userLogged.uid}`}>Perfil</Link>
                </div>
                : null
            }
            <a className='logout-link' onClick={() => Api.signOut(navigate)}>Sair</a>
            
        </StyledHeader>
    )
}
