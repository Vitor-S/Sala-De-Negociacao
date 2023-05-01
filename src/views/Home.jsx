import React from 'react'
import { motion } from 'framer-motion'
import errorManager from '../utils/errorManager'

//components
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
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
                <motion.div className="section-central"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{delay: 0.3}}>
                    <div className="section-info-container">
                        <div className='section-title'>Crie Sua </div>
                        <p className='section-subtext'>
                            Com a nossa sala de negociação, você pode formar sua própria rede de contatos facilmente, diretamente na palma da sua mão! Conecte-se com outros negociadores experientes, compartilhe conhecimento e aprenda com os melhores.
                        </p>
                        <Button variant="contained" color="primary"
                            onClick={() => navigate('/search')}>
                            Saber Mais
                        </Button>
                    </div>
                    <div className="section-image-container">
                        <img src={image1} />
                    </div>
                </motion.div>
            </section>
            <section>
                <div className="tips-container">
                    <motion.div className="tip"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}>
                        <div className="tip-bg" />
                        <h2 className='tip-title'>A Pesquisa Certa</h2>
                        <p className='tip-text'>
                            Investir tempo em uma pesquisa mais aprofundada pode muitas vezes ser a melhor estratégia. Ao realizar uma pesquisa detalhada, é possível reduzir o tempo necessário para negociar. Uma pesquisa cuidadosa pode ajudar a identificar potenciais parceiros comerciais mais rapidamente e tornar as negociações mais eficientes, economizando tempo e recursos valiosos.
                        </p>
                    </motion.div>
                    <motion.div className="tip"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}>
                        <div className="tip-bg" />
                        <h2 className='tip-title'>Seja Flexível</h2>
                        <p className='tip-text'>
                            Estar disposto a negociar e ajustar a proposta de acordo com as necessidades e interesses é fundamental para estabelecer uma parceria bem-sucedida. Ao demonstrar flexibilidade é possível construir um acordo que seja mutuamente benéfico e atenda às necessidades de ambas as partes envolvidas. Essa abordagem colaborativa pode aumentar as chances de uma parceria duradoura e bem-sucedida.
                        </p>
                    </motion.div>
                    <motion.div className="tip"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}>
                        <div className="tip-bg" />
                        <h2 className='tip-title'>Seja Claro</h2>
                        <p className='tip-text'>
                            Para garantir uma parceria de sucesso, é essencial que o acordo seja claro e completo, estabelecendo com clareza os objetivos, responsabilidades, prazos e remuneração de cada parte envolvida. Um acordo detalhado ajuda a evitar mal-entendidos e conflitos futuros, além de fornecer um guia claro para ambas as partes seguirem.
                        </p>
                    </motion.div>
                </div>
            </section>
        </StyledHome>
    )
}
