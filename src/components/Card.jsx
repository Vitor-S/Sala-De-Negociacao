import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

//styles
import { StyledCard } from '../styles/components-styles';

export default function Card({ user }) {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/profile/${user.id}`)
    }

    return (
        <StyledCard onClick={handleCardClick}>
            <motion.div
                className='card-motion-container'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, duration: 0.3 }}>
                <div className="photo-container">
                    {
                        user.PhotoUrl ? <img src={user.PhotoUrl} /> :
                        <img src="https://unicerrado.edu.br/wp-content/uploads/placeholder-unicerrado-redondo.png"/>
                    }
                </div>
                <div className="info-container">
                    <h3>{`${user.name} ${user.surname}`}</h3>
                    <span>
                        {`${user.supplier ? 'Fornecedor na área de ' : 'Lojista na área de '}` + user.area}
                    </span>
                </div>
            </motion.div>
        </StyledCard>
    )
}
