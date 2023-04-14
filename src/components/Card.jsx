import React, { useEffect, useState } from 'react'

//components
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton } from '@mui/material';

//styles
import { StyledCard } from '../styles/components-styles';

export default function Card() {

    return (
        <StyledCard className='card-container'>
            <div className="photo-container">
                <img src="https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg" alt="imagem de perfil" />
            </div>
            <div className="info-container">
                <h3>Nome</h3>
                <span>Descrição</span>
            </div>
        </StyledCard>
    )
}
