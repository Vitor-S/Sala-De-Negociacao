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

import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';

export default function Profile() {
    
    const [modalState, setModalState] = useState(false)

    const [user, setUser] = useState(null);
    const [currentUser, setcurrentUser] = useState()
    const [currentUserData, setCurrentUserData] = useState()

    const userId = useParams();    
  
    useEffect(() => {
        Api.getDocById(userId.id, setUser)
    }, [])
    
    useEffect(() => {
        auth.onAuthStateChanged((currentUser) => {
            setcurrentUser(currentUser);
            Api.getDocById(currentUser.uid, setCurrentUserData)
        });
    }, [])
    

    const handleLocationClick = () => {

        const destination = user.street.replaceAll(' ', '+') + '+' + user.city.replaceAll(' ', '+') + '+' + user.state.replaceAll(' ', '+')

        const origin = currentUserData.street.replaceAll(' ', '+') + '+' + currentUserData.city.replaceAll(' ', '+') + '+' + currentUserData.state.replaceAll(' ', '+')
    
        window.location = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`
    }
    
    return (user != null) ? (
        <StyledProfile >
            <Header/>
            <div className="profile-container">
                <div className="left-container">
                    <div className="info-container">
                        {
                            (currentUser.uid == user.id) ? 
                            <IconButton className='edit-profile' onClick={() => setModalState(true)}> 
                                <EditIcon />
                            </IconButton> : null
                        }
                        
                        
                        <img src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="" className="profile-picture" />
                        <h2>{`${user.name} ${user.surname}`}</h2>
                        <h3>Fornecedor de {user.area}</h3>
                        <div className="locale">
                            <LocationOnIcon/>
                            <span >{`${user.city} ${user.state}`}</span>
                        </div>
                        <div className="social-medias">
                            <IconButton >
                                <LocalPhoneIcon color='primary'/>
                            </IconButton>
                            <IconButton onClick={() => 
                                window.location.href = "mailto:" + user.email
                            }>
                                <EmailIcon sx={{color: '#f9aa2a'}}/>
                            </IconButton>
                            <IconButton onClick={() =>
                                window.location.href =`https://api.whatsapp.com/send?phone=${user.phone}`
                            }>
                                <WhatsAppIcon color='success'/>
                            </IconButton>
                            <IconButton onClick={handleLocationClick}>
                                <LocationOnIcon color='error'/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="right-container">
                    {
                        (currentUser.uid == user.id) ? 
                        <h2>Verifique suas reuniões, {user.name} </h2>
                        : <h2>Marque uma reunião com {user.name} </h2>
                    }
                    <Calendar userLoggedId={currentUser.uid} profileOwner={user}/>
                </div>
            </div>
            {
                modalState ? <EditModal 
                                setModal={setModalState}
                                owner={user}
                                profileOwner={currentUser}/> : null
            }
        </StyledProfile>
    ) : null
}

function EditModal({ setModal, owner, profileOwner }){

    console.log(owner, profileOwner)

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