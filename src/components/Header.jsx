import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { StyledHeader } from '../styles/components-styles'
import HandshakeIcon from '@mui/icons-material/Handshake';
import Button from '@mui/material/Button'
import { motion } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu';
import Loading from './Loading';

import myApi from '../service/myApi';
import { auth } from '../service/myFirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth'


export default function Header() {

    const [dropdownState, setDropdownState] = useState(false)

    const navigate = useNavigate()

    const [userLogged, setUserLogged] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/login')
            else setUserLogged(user)
        });
    }, [])

    return (userLogged != null && userLogged != undefined) ? (
        <StyledHeader className='header'>
            <div className="header-logo" onClick={() => navigate('/')}>
                <HandshakeIcon fontSize='large' sx={{ color: '#fff' }} />
                <span>Sala de Negociação</span>
            </div>
            <ul className="header-links">
                <li><Link to='/'>Início</Link></li>
                <li><Link to='/search'>Pesquisar</Link></li>
                <li><Link to={`/chat?logged=${userLogged.uid}`}>Contatos</Link></li>
                <li><Link to={`/profile/${userLogged.uid}`}>Perfil</Link></li>
                <li><a className='logout-link' onClick={() => myApi.signOut(navigate)}>Sair</a></li>
            </ul>

            <Button className='dropdown-button'
                onClick={() => setDropdownState(!dropdownState)}>
                <MenuIcon />
            </Button>
            {
                dropdownState ? 
                <motion.div className='dropdown-container'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', damping: 12, duration: 0.3 }}>
                    <ul>
                        <li><Link to='/'>Início</Link></li>
                        <li><Link to='/search'>Pesquisar</Link></li>
                        <li><Link to={`/chat?logged=${userLogged.uid}`}>Conversas</Link></li>
                        <li><Link to={`/profile/${userLogged.uid}`}>Perfil</Link></li>
                        <li><a className='logout-link' onClick={() => myApi.signOut(navigate)}>Sair</a></li>
                    </ul>
                </motion.div> : null
            }
        </StyledHeader>
    ) : <Loading/>
}
