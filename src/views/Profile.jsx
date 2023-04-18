import React, { useState, useEffect } from 'react'
import { Api, auth } from '../service/Api'

import { StyledProfile, StyledEditModal } from '../styles/styles'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Calendar from '../components/Calendar'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Button } from '@mui/material';
import Header from '../components/Header'

import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Profile() {
    const { state } = useLocation()

    const navigate = useNavigate()
    
    const [modalState, setModalState] = useState(false)
    const [userLogged, setUserLogged] = useState()

    useEffect(() => {
        Api.getCurrentUser(setUserLogged)
    }, [])

    const handleLocationClick = () => {

        const destination = state.street.replaceAll(' ', '+') + '+' + state.city.replaceAll(' ', '+') + '+' + state.state.replaceAll(' ', '+')

        const origin = userLogged.street.replaceAll(' ', '+') + '+' + userLogged.city.replaceAll(' ', '+') + '+' + userLogged.state.replaceAll(' ', '+')
    
        window.location = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`
    }
    
    return (
        <StyledProfile >
            <Header/>
            <div className="profile-container">
                <div className="left-container">
                    <div className="info-container">
                        {
                            state.id == auth.currentUser.uid ?
                            <IconButton className='edit-profile' onClick={() => setModalState(true)}> 
                                <EditIcon />
                            </IconButton> : null
                        }
                        <img src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="" className="profile-picture" />
                        <h2>{`${state.name}  ${state.surname}`}</h2>
                        <h3>{`${state.supplier ? 'Fornecedor de ' : 'Lojista de '}` + state.area}</h3>
                        <div className="locale">
                            <LocationOnIcon/>
                            <span >{`${state.city},  ${state.state}`}</span>
                        </div>
                        <div className="social-medias">
                            <IconButton>
                                <LocalPhoneIcon color='primary'/>
                            </IconButton>
                            <IconButton onClick={() => window.location.href = "mailto:"+state.email}>
                                <EmailIcon sx={{color: '#f9aa2a'}}/>
                            </IconButton>
                            <IconButton onClick={() => {
                                window.location.href = `https://api.whatsapp.com/send?phone=${state.phone}`
                            }}>
                                <WhatsAppIcon color='success'/>
                            </IconButton>
                            <IconButton onClick={handleLocationClick}>
                                <LocationOnIcon color='error'/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="right-container">
                    <h2>Marque uma reunião com {state.name}</h2>
                    <Calendar state={state} />
                </div>
            </div>
            {
                modalState ? <EditModal setModal={setModalState}/> : null
            }
            
        </StyledProfile>
    )
}

function EditModal({ setModal }){

    function handleCloseModal(ev){
        if(ev.target.className.includes('modal-wrapper')) setModal(false)
    }

    return(
        <StyledEditModal className='modal-wrapper' onClick={handleCloseModal}>
            <div className="modal-container">
                <h3>Atualize seus dados</h3>
                <TextField fullWidth label="Nome"/>
                <TextField fullWidth label="Email"/>
                <TextField fullWidth label="Telefone"/>
                <TextField fullWidth label="Produto Fornecido"/>
                <TextField fullWidth label="Estado"/>
                <TextField fullWidth label="Cidade"/>
                <TextField fullWidth label="Bairro"/>
                <TextField fullWidth label="Rua"/>
                <div className="modal-options">
                    <Button variant="contained" color='success'>
                        Salvar
                    </Button>
                </div>
            </div>
        </StyledEditModal>
    )
}