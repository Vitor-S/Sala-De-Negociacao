import React from 'react'

import { StyledFooter } from '../styles/components-styles'
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WebIcon from '@mui/icons-material/Web';
import AddIcon from '@mui/icons-material/Add';

export default function Footer() {
  return (
    <StyledFooter>
        <div className="footer-info-container">
            <div className="footer-container company-info">
                <h4>Sobre nós</h4>
                <p>
                    Sala de negociações é um projeto que visa agilizar o processo de contato entre lojistas e fornecedores.
                </p>
            </div>
            <div className="footer-container products">
                <h4>Produtos</h4>
                <span className='link-hover'
                    onClick={
                        () => window.open("https://sala-de-negociacao.vercel.app/", '_blank')
                    }
                >
                    <WebIcon />Sala de Negociação
                    </span>
                <span className='disabled'><AddIcon />Mais produtos em breve</span>
            </div>
            <div className="footer-container contacts">
                <h4>Fale Conosco</h4>
                <span className='link-hover'
                    onClick={() => window.location.href = "mailto:" + "SalaDeNegociação@gmail.com"}
                >
                    <EmailIcon />Envie um Email
                </span>
                <span><LocalPhoneIcon />(31) 4002-8922</span>
            </div>
        </div>
        <div className="copyright-container">
            © 2023 Copyright: Sala de Negociação
        </div>
    </StyledFooter>
  )
}
