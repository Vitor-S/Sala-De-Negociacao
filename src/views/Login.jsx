import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { login_validation } from '../utils/yup'

//components and icons
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

//styles and assets
import { StyledLogin } from '../styles/styles';
import login_bg from '../assets/login-bg.png'

//service
import myApi from '../service/myApi'

export default function Login() {    
    
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(login_validation)
    })

    return (
        <StyledLogin>
            <div className="form-wrapper">
                <div className="form-bg">
                    <img src={login_bg} alt="login background" />
                </div>
                <div className="form-container">
                    <form onSubmit={
                        handleSubmit(data => myApi.signInWithEmailAndPassword(data.email, data.password, navigate))
                    }>
                        <span>LOGIN</span>

                        <div className="inputs-container">
                            <TextField fullWidth error={Boolean(errors.email)}
                                label="Email"
                                variant="outlined"
                                {...register('email')}
                                helperText={errors.email?.message} />

                            <TextField fullWidth error={Boolean(errors.password)}
                                type='password'
                                label="Senha"
                                variant="outlined"
                                {...register('password')}
                                helperText={errors.password?.message} />

                            <Button fullWidth style={{ height: '50px' }}
                                type='submit' variant="contained" color="success">
                                Entrar
                            </Button>

                            {/* <Button onClick={() => Api.signInWithGooglePopup()} variant="outlined" startIcon={<GoogleIcon />}>
                                Entrar com Google
                            </Button> */}
                        </div>
                        <div>
                            Crie já sua conta ! <Link to='/register'>Registre-se</Link>
                        </div>
                    </form>
                </div>
            </div>
        </StyledLogin>
    )
}
