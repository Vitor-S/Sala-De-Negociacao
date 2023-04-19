import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

//components
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LeakAddIcon from '@mui/icons-material/LeakAdd';

//styles
import { StyledHome } from '../styles/styles'

export default function Home() {

    const navigate = useNavigate()

    return (
        <StyledHome>
            <Header />
            <body>
                <section className="main-tip">
                    <div className="tip-info">
                        <div className="tip-info-container">
                            <span className='tip-title'>Nossa <span>dica</span> de hoje é</span>
                            <p>
                            Defina seus objetivos: antes de buscar por parceiros comerciais, é importante que você defina claramente seus objetivos e metas. Isso ajudará a identificar parceiros que estejam alinhados com sua visão de negócio.
                            </p>
                            <a href="https://resultadosdigitais.com.br/?s=objetivos" target='_blank'>Saber mais</a>
                        </div>
                    </div>
                    <div className="tip-image">
                        <div className="tip-image-container">
                            <img className='section-image' src="https://media.istockphoto.com/id/1424808451/pt/foto/2023-new-year-goal-plan-action-concepts-with-text-on-notepad-and-office-accessories-business.jpg?s=1024x1024&w=is&k=20&c=hX1DyjQXljiRXx5zP0qWj52f14o8fNT5dCB1GeU1tFQ=" alt="tip-image" />
                        </div>
                    </div>
                </section>
                <section className="second-tip main-tip">
                    <div className="tip-image">
                        <div className="tip-image-container">
                            <img className='section-image' src="https://cdn.pixabay.com/photo/2021/05/05/18/42/buyer-persona-6231739_960_720.png" alt="tip-image" />
                        </div>
                    </div>
                    <div className="tip-info">
                        <div className="tip-info-container">
                            <span className='tip-title'>Conheça seu <span style={{ color: '#fff' }}>público-alvo</span></span>
                            <p style={{ color: '#fff' }}>
                            É importante conhecer seu público-alvo para identificar parceiros que também atuem nesse mercado. Dessa forma, será mais fácil estabelecer parcerias que tragam benefícios mútuos.
                            </p>
                            <a style={{ color: '#fff' }} href="https://resultadosdigitais.com.br/marketing/publico-alvo-cliente-ideal-buyer-persona/" target='_blank' className='second-tip-link'>Saber mais</a>
                        </div>
                    </div>
                </section>
                <section className="main-tip">
                    <div className="tip-info">
                        <div className="tip-info-container">
                            <span className='tip-title'>Acesse mais <span>dicas</span>:</span>
                            <p>
                                O conhecimento é um elemento fundamental para conseguir mais parceiros comerciais. Quanto mais você conhece o mercado em que atua, o perfil do seu público-alvo, as tendências do setor e as melhores práticas de negociação, mais preparado estará para identificar possíveis parceiros e estabelecer relações comerciais duradouras e benéficas para ambas as partes.
                            </p>
                            <a href="https://resultadosdigitais.com.br/marketing/publico-alvo-cliente-ideal-buyer-persona/" target='_blank' className='second-tip-link'>Saber mais</a>
                        </div>
                    </div>
                    
                </section>
            </body>
        </StyledHome>
    )
}
