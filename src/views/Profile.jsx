import React, { useState, useEffect } from 'react'
import { Api, auth } from '../service/Api'
import myApi from '../service/myApi';

import { StyledProfile, StyledEditModal } from '../styles/styles'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Calendar from '../components/Calendar'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Button } from '@mui/material';
import Header from '../components/Header'
import ChatIcon from '@mui/icons-material/Chat';

import { useNavigate, useParams } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate()

    //estado do modal de edição
    const [modalState, setModalState] = useState(false)

    //dados do dono da página
    const [user, setUser] = useState(null);

    //usuário logado(currentUser)
    const [userLogged, setUserLogged] = useState()

    //dados do usuário logado
    const [userLoggedData, setUserLoggedData] = useState()

    //imagem do perfil atual
    const [pictureUrl, setPictureUrl] = useState('')

    //id do dono da página vindo da URL
    const userId = useParams();

    useEffect(() => {
        (async () => {
            const data = await myApi.getDocById('users', userId.id)
            setUser(data)
        })()
    }, [userId])

    useEffect(() => {
        auth.onAuthStateChanged((userLogged) => {
            setUserLogged(userLogged);
            (async () => {
                const data = await myApi.getDocById('users', userLogged.uid)
                setUserLoggedData(data)
            })()
        });
    }, [])

    useEffect(() => {
        (async () => {
            const imgUrl = await myApi.getImage('images', userId.id)
            if (imgUrl) setPictureUrl(imgUrl)
        })()
    }, [userId])

    const handleLocationClick = () => {

        const destination = user.street.replaceAll(' ', '+') + '+' + user.city.replaceAll(' ', '+') + '+' + user.state.replaceAll(' ', '+')

        const origin = userLoggedData.street.replaceAll(' ', '+') + '+' + userLoggedData.city.replaceAll(' ', '+') + '+' + userLoggedData.state.replaceAll(' ', '+')

        window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`, '_blank')
    }

    return (user != null) ? (
        <StyledProfile >
            <Header />
            <div className="profile-body">
                <div className="left-container">
                    <div className="info-container">
                        {
                            (userLogged.uid == user.id) ?
                                <IconButton
                                    className='edit-profile'
                                    onClick={() => setModalState(true)}>
                                    <EditIcon />
                                </IconButton> : null
                        }
                        {
                            pictureUrl ?
                                <img src={pictureUrl} alt="foto de perfil" className="profile-picture" /> :
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' alt="foto de perfil" className="profile-picture" />
                        }
                        <h2>{`${user.name} ${user.surname}`}</h2>
                        <h3>Fornecedor de {user.area}</h3>
                        <div className="locale" onClick={() => window.open('', '_blank')}>
                            <LocationOnIcon />
                            <span >{`${user.city} ${user.state}`}</span>
                        </div>
                        <div className="social-medias">
                            <IconButton
                                onClick={() => navigate(`/chat?logged=${userLogged.uid}&receiver=${user.id}`)}>
                                <ChatIcon fontSize='large' style={{ color: '#0048ff' }} />
                            </IconButton>
                            <IconButton onClick={() =>
                                window.location.href = "mailto:" + user.email
                            }>
                                <EmailIcon fontSize='large' sx={{ color: '#ffbe56' }} />
                            </IconButton >
                            <IconButton onClick={() =>
                                window.open(`https://api.whatsapp.com/send?phone=${user.phone}`, '_blank')
                            }>
                                <WhatsAppIcon fontSize='large' style={{ color: '#2dfc68' }} />
                            </IconButton>
                            <IconButton onClick={handleLocationClick}>
                                <LocationOnIcon fontSize='large' style={{ color: '#ff3a3a' }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="right-container">
                    {
                        (userLogged.uid == user.id) ?
                            <h2 >Verifique suas reuniões, {user.name} </h2>
                            : <h2 >Marque uma reunião com {user.name} </h2>
                    }
                    <Calendar userLoggedId={userLogged.uid} profileOwner={user} />
                </div>
                    {
                        modalState ? <EditModal
                            setModal={setModalState}
                            profileOwnerId={userId.id}
                            currentPicture={pictureUrl} /> : null
                    }
                </div>
        </StyledProfile>
    ) : null
}

function EditModal({ setModal, profileOwnerId, currentPicture }) {

    const [progress, setProgress] = useState(0)
    const [imageUrl, setImageUrl] = useState('')

    function handleCloseModal(ev) {
        if (ev.target.className.includes('modal-wrapper')) {
            setModal(false)
            window.location.reload()
        }
    }

    useEffect(() => {
        (async () => {
            const imgUrl = await myApi.getImage('images', profileOwnerId)
            if (imgUrl) setImageUrl(imgUrl)
        })()
    }, [profileOwnerId, progress])

    return (
        <StyledEditModal className='modal-wrapper' onClick={handleCloseModal}>
            <div className="modal-container">
                <h2>Atualize seus dados</h2>
                <form
                    className="edit-picture"
                    onSubmit={async ev => await myApi.setImage(ev, setProgress, setImageUrl, 'images', profileOwnerId)}>
                    <label htmlFor="teste">
                        {
                            imageUrl ? <img src={imageUrl} alt="" className="profile-picture" /> :
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' alt="foto de perfil" className="profile-picture" />
                        }
                    </label>
                    <input type="file" id='teste' />
                    <Button type='submit' color="primary">
                        Salvar Foto
                    </Button>
                    <Button type='submit' color="error" onClick={() => myApi.clearPhotoUrl()}>
                        Remover Foto
                    </Button>
                </form>
                <div className="edit-1">
                    <TextField fullWidth label='Nome' />
                    <TextField fullWidth label='Sobrenome' />
                    <TextField fullWidth label='Email' />
                    <TextField fullWidth label='Telefone' />
                    <TextField fullWidth label='Tipo de usuário' />
                </div>
                <div className="edit-2">
                    <TextField fullWidth label='Área de Atuação' />
                    <TextField fullWidth label='Estado' />
                    <TextField fullWidth label='Cidade' />
                    <TextField fullWidth label='Bairro' />
                    <TextField fullWidth label='Rua' />
                </div>
                <div className="edit-options">
                    <Button
                        onClick={ev => {
                            setModal(false)
                            window.location.reload()
                        }}
                        variant="outlined" color="error">
                        Voltar
                    </Button>
                    <Button variant="outlined" color="primary">
                        Salvar
                    </Button>
                </div>
            </div>
        </StyledEditModal>
    )
}