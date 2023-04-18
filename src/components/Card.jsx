import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';

//styles
import { StyledCard } from '../styles/components-styles';

export default function Card({ user }) {
    const navigate = useNavigate()

    const handleCardClick = () => {
        console.log(user.id)
        navigate('/profile', {
            state: user
        })
    }

    return (
        <StyledCard onClick={handleCardClick}>
            <div className="photo-container">
                <img src="https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg" alt="imagem de perfil" />
            </div>
            <div className="info-container">
                <h3>{`${user.name} ${user.surname}`}</h3>
                <span>
                    {`${user.supplier ? 'Fornecedor na área de ' : 'Lojista na área de '}` + user.area}
                </span>
            </div>
        </StyledCard>
    )
}
