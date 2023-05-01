import * as yup from "yup";

const phoneRegExp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

export const register_validation = yup.object().shape({
    name: yup.string().required('Campo Obrigatório').min(3, 'Mínimo 3 letras').max(20, 'Máximo 20 letras'),
    surname: yup.string().required('Campo Obrigatório').min(3, 'Mínimo 3 letras').max(20, 'Máximo 20 letras'),
    email: yup.string().required('Campo Obrigatório').email('Email inválido').lowercase(),
    password: yup.string().required('Campo Obrigatório').min(6, 'Mínimo 6 caracteres'),
    check_password: yup.string().required('Campo Obrigatório').oneOf([yup.ref('password'), null], 'As senhas são diferentes'),
    supplier: yup.string().required('Campo Obrigatório'),
    area: yup.string().required('Campo Obrigatório').min(3, 'Mínimo 3 letras').max(20, 'Máximo 20 letras'),
    state: yup.string().required('Campo Obrigatório'),
    city: yup.string().required('Campo Obrigatório'),
    phone: yup.string().matches(phoneRegExp, 'Digite um número de telefone válido'),
    neighborhood: yup.string().required('Campo Obrigatório'),
    street: yup.string().required('Campo Obrigatório'),
})

export const login_validation = yup.object().shape({
    email: yup.string().required('Campo Obrigatório').email('Email inválido').lowercase(),
    password: yup.string().required('Campo Obrigatório').min(6, 'Mínimo 6 caracteres')
})

export const meetingValidation = yup.object().shape({
    message: yup.string().required('Digite uma mensagem')
})

export const edit_data_validation = yup.object().shape({
    name: yup.string().max(20, 'Máximo 20 letras'),
    surname: yup.string().max(20, 'Máximo 20 letras'),
    email: yup.string().email('Email inválido').lowercase(),
    supplier: yup.string(),
    area: yup.string().max(20, 'Máximo 20 letras'),
    state: yup.string(),
    city: yup.string(),
    phone: yup.string(),
    neighborhood: yup.string(),
    street: yup.string(),
})