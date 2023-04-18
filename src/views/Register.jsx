import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { register_validation } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';

//service
import { Api } from '../service/Api';

//components
import { TextField, Button, InputLabel, MenuItem, FormControl, Select, FormHelperText, Autocomplete } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

//styles
import { StyledRegister } from '../styles/styles';

export default function Register() {

    const navigate = useNavigate()

    //states
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(register_validation)
    })
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [currentState, setCurrentState] = useState(undefined)

    useEffect(() => {        
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const list = []
            res.data.forEach(obj => list.push(obj.sigla))
            setStates(list.sort())
        })
    }, [])

    return (
        <StyledRegister>
            <form className="container" 
                onSubmit={handleSubmit((data) => {
                    Api.createUserWithEmailAndPassword(data, navigate)
                    // firebaseCreateUser(data, () => navigate('/login'))
                    console.log(data)
                })}>

                <TextField label="Nome" {...register('name')} 
                    error={Boolean(errors.name)} helperText={errors.name?.message}/>

                <FormControl fullWidth error={Boolean(errors.supplier)} >
                    <InputLabel>Tipo de usuário</InputLabel>
                    <Select defaultValue='' {...register('supplier')} >
                        <MenuItem value={Boolean(true)}>Fornecedor</MenuItem>
                        <MenuItem value={Boolean(false)}>Contratante</MenuItem>
                    </Select>
                    <FormHelperText>{errors.supplier?.message}</FormHelperText>
                </FormControl>  

                <TextField label="Sobrenome" {...register('surname')}
                    error={Boolean(errors.surname)} helperText={errors.surname?.message}/>

                <TextField label="Área de atuação" {...register('area')}
                    error={Boolean(errors.area)} helperText={errors.area?.message}/>

                <TextField label="Email" {...register('email')}
                    error={Boolean(errors.email)} helperText={errors.email?.message}/>

                <Autocomplete
                    title='state'
                    options={states}
                    renderInput={(params) => 
                        <TextField error={Boolean(errors.state)} helperText={errors.state?.message} {...register('state')} {...params} label="Estado" 
                    />}
                    onChange={(ev, value) => {
                        setCurrentState(value)
                        if(value != null){
                            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/distritos`)
                            .then((res) => {
                                const resList = []
                                res.data.forEach(obj => resList.push(obj.nome))
                                setCities(resList.sort())
                            })
                        }
                    }}
                />

                <TextField label="Senha" {...register('password')} type='password'
                    error={Boolean(errors.password)} helperText={errors.password?.message}/>

                <Autocomplete 
                    name='city'
                    disabled={currentState == null || currentState == undefined}
                    options={cities}
                    renderInput={(params) => 
                        <TextField error={Boolean(errors.city)} helperText={errors.city?.message} {...register('city')} {...params} label="Cidade" 
                    />}
                />

                <TextField 
                    label="Confirmação de senha" 
                    {...register('check_password')}
                    type='password'
                    error={Boolean(errors.check_password)} 
                    helperText={errors.check_password?.message}/>

                <TextField label="Bairro" {...register('neighborhood')}
                    error={Boolean(errors.neighborhood)} helperText={errors.neighborhood?.message}/>

                <TextField label="Celular" {...register('phone')}
                    error={Boolean(errors.phone)} helperText={errors.phone?.message}/>
                    
                <TextField label="Rua" {...register('street')}
                    error={Boolean(errors.street)} helperText={errors.street?.message}/>

                <Button
                    type='submit'
                    className='span-2' 
                    variant="contained" 
                    color="success" 
                    sx={{ height: 50 }}>
                        Registrar
                </Button>

                <span className='span-2'>Já possui uma conta ? <Link to='/login'>Login</Link></span>
            </form>
        </StyledRegister>
    )
}
