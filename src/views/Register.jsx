import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { register_validation } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';

//service
import myApi from '../service/myApi'

//components
import { TextField, Button, InputLabel, MenuItem, FormControl, Select, FormHelperText, Autocomplete } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

//styles
import { StyledRegister } from '../styles/styles';

export default function Register() {

    const navigate = useNavigate()

    //states
    const { register, handleSubmit, formState: { errors } } = useForm({
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
                    data.supplier = JSON.parse(data.supplier)
                    myApi.createUserWithEmailAndPassword(data, navigate)
                    // console.log(data)
                })}>
                <div className='two-containers'>
                    <div className="left-container">
                        <TextField label="Nome" {...register('name')}
                            error={Boolean(errors.name)} helperText={errors.name?.message} />

                        <TextField label="Sobrenome" {...register('surname')}
                            error={Boolean(errors.surname)} helperText={errors.surname?.message} />

                        <TextField label="Email" {...register('email')}
                            error={Boolean(errors.email)} helperText={errors.email?.message} />

                        <TextField label="Senha" {...register('password')} type='password'
                            error={Boolean(errors.password)} helperText={errors.password?.message} />

                        <TextField
                            label="Confirmação de senha"
                            {...register('check_password')}
                            type='password'
                            error={Boolean(errors.check_password)}
                            helperText={errors.check_password?.message} />

                        <TextField label="Celular" {...register('phone')}
                            error={Boolean(errors.phone)} helperText={errors.phone?.message} />
                    </div>

                    <div className="right-container">
                        <FormControl fullWidth error={Boolean(errors.supplier)} >
                            <InputLabel>Tipo de usuário</InputLabel>
                            <Select 
                                defaultValue=''
                                {...register('supplier', { valueAsNumber: true }) } >
                                <MenuItem value={1}>Fornecedor</MenuItem>
                                <MenuItem value={0}>Contratante</MenuItem>
                            </Select>
                            <FormHelperText>{errors.supplier?.message}</FormHelperText>
                        </FormControl>

                        <TextField label="Área de atuação" {...register('area')}
                            error={Boolean(errors.area)} helperText={errors.area?.message} />

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

                        <TextField label="Bairro" {...register('neighborhood')}
                            error={Boolean(errors.neighborhood)} helperText={errors.neighborhood?.message} />

                        <TextField label="Rua" {...register('street')}
                            error={Boolean(errors.street)} helperText={errors.street?.message} />
                    </div>
                </div>

                <div className="options-container span-2">
                    <Button
                        type='submit'
                        fullWidth
                        className='span-2'
                        variant="contained"
                        color="success"
                        sx={{ height: 50 }}>
                        Registrar
                    </Button>

                    <span className='link-login'>Já possui uma conta ? <Link to='/login'>Login</Link></span>
                </div>
            </form>
        </StyledRegister>
    )
}
