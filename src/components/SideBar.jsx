import React, { useEffect } from 'react'
import Api from '../service/Api'
import { useNavigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
//styles
import { StyledSideBar } from '../styles/components-styles';

export default function SideBar() {

    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (!user) navigate('/login')
        else console.log('user possui algo')
      });
    }, [])
    
    return (
        <StyledSideBar>
            <div className="sidebar-header">
                {/* HEADER */}
                <div className="photo">
                    <img src="https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg" alt="" className="photo" />
                </div>
                <div className='name'>Wanderley Caldeira</div>
                <a href="#" className='exit' onClick={() => Api.firebaseSignOut()}>Sair</a>
            </div>
        </StyledSideBar>
    )
}
