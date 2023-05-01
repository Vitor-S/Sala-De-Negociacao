import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

//components
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import image1 from '../assets/section1.png'
import { Button } from '@mui/material'

//styles
import { StyledHome } from '../styles/styles'

export default function Home() {

    const navigate = useNavigate()

    return (
        <StyledHome>
            <Header />
            <section>
                <div className="section-central">
                    <div className="section-info-container">
                        <div className='section-title'>Crie Sua </div>
                        <p className='section-subtext'>
                            Com a nossa sala de negociação, você pode formar sua própria rede de contatos facilmente, diretamente na palma da sua mão! Conecte-se com outros negociadores experientes, compartilhe conhecimento e aprenda com os melhores.
                        </p>
                        <Button variant="contained" color="primary">
                            Action
                        </Button>
                    </div>
                    <div className="section-image-container">
                        <img src={image1} />
                    </div>
                </div>
            </section>
        </StyledHome>
    )
}
