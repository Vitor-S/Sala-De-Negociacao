import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { StyledHeader } from '../styles/components-styles'
import { Api, auth } from '../service/Api'

export default function Header() {

    const [data, setData] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        Api.getCurrentUser(setData)
        // if(!auth.currentUser) navigate('/login')
    }, [])

    return (
        <StyledHeader>
            <div className="left-links">
                <Link to='/'>Home</Link>
                <Link to='/search'>Pesquisar</Link>
                <Link to='/profile' state={data}>Perfil</Link>
            </div>
            <a className='logout-link' onClick={() => Api.signOut(navigate)}>Sair</a>
        </StyledHeader>
    )
}
