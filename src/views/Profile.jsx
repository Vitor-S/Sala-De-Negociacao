import React, { useState, useEffect } from 'react'
import myApi from '../service/myApi';
import { auth } from '../service/myFirebaseConfig';
import { edit_data_validation } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { TextField, Button, Autocomplete } from '@mui/material';
import { StyledProfile, StyledEditModal } from '../styles/styles'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Calendar from '../components/Calendar'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Header from '../components/Header'
import ChatIcon from '@mui/icons-material/Chat';
import Loading from '../components/Loading';

import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
                        {
                            user.supplier ? 
                            <h3>Fornecedor(a) na área de {user.area}</h3> :
                            <h3>Lojista na área de {user.area}</h3>

                        }
                        
                        <div className="locale">
                            <LocationOnIcon />
                            <span >{`${user.city} ${user.state}`}</span>
                        </div>
                        <div className="social-medias">
                            {
                                userLogged.uid != user.id ?
                                    <>
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
                                    </> :
                                    <>
                                        <IconButton>
                                            <ChatIcon fontSize='large' style={{ color: '#0048ff' }} />
                                        </IconButton>
                                        <IconButton >
                                            <EmailIcon fontSize='large' sx={{ color: '#ffbe56' }} />
                                        </IconButton >
                                        <IconButton>
                                            <WhatsAppIcon fontSize='large' style={{ color: '#2dfc68' }} />
                                        </IconButton>
                                        <IconButton>
                                            <LocationOnIcon fontSize='large' style={{ color: '#ff3a3a' }} />
                                        </IconButton>
                                    </>
                            }
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
    ) : <Loading />
}

function EditModal({ setModal, profileOwnerId }) {

    const [progress, setProgress] = useState(0)
    const [imageUrl, setImageUrl] = useState('')

    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [currentState, setCurrentState] = useState(undefined)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(edit_data_validation)
    })

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

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const list = []
            res.data.forEach(obj => list.push(obj.sigla))
            setStates(list.sort())
        })
    }, [])

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
                <form className='data-form'>
                    <div className="edit-1">
                        <TextField {...register("name")} fullWidth label='Nome' />
                        <TextField {...register("surname")} fullWidth label='Sobrenome' />
                        <TextField {...register("email")} fullWidth label='Email de Contato' />
                        <TextField {...register("phone")} fullWidth label='Telefone' />

                        <Autocomplete
                            name='supplier'
                            options={["Fornecedor", "Contratante"]}
                            renderInput={(params) =>
                                <TextField {...register('supplier')} {...params}
                                    label="Tipo de usuário"
                                />
                            }
                        />
                    </div>
                    <div className="edit-2">
                        <TextField {...register("area")} fullWidth label='Área de Atuação' />

                        <Autocomplete
                            title='state'
                            options={states}
                            renderInput={(params) =>
                                <TextField error={Boolean(errors.state)} helperText={errors.state?.message} {...register('state')} {...params} label="Estado"
                                />}
                            onChange={(ev, value) => {
                                setCurrentState(value)
                                if (value != null) {
                                    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/distritos`)
                                        .then((res) => {
                                            const resList = []
                                            res.data.forEach(obj => resList.push(obj.nome))
                                            setCities(resList.sort())
                                        })
                                }
                            }}
                        />

                        <Autocomplete
                            name='city'
                            disabled={currentState == null || currentState == undefined}
                            options={cities}
                            renderInput={(params) =>
                                <TextField error={Boolean(errors.city)} helperText={errors.city?.message} {...register('city')} {...params} label="Cidade"
                                />}
                        />

                        <TextField {...register("neighborhood")} fullWidth label='Bairro' />
                        <TextField {...register("street")} fullWidth label='Rua' />
                    </div>
                </form>
                <div className="edit-options">
                    <Button
                        onClick={ev => {
                            setModal(false)
                            window.location.reload()
                        }}
                        variant="outlined" color="error">
                        Voltar
                    </Button>
                    <Button variant="outlined" color="primary"
                        onClick={handleSubmit(async (data) => {
                            if (data.supplier && data.supplier == "Fornecedor") {
                                data.supplier = true
                            } else if (data.supplier && data.supplier == "Contratante") {
                                data.supplier = false
                            }

                            await myApi.updateUserData(data)
                        })}>
                        Salvar
                    </Button>
                </div>
            </div>
        </StyledEditModal>
    )
}