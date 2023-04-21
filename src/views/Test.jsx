import React, { useEffect, useState } from 'react'
import { Api, db } from '../service/Api'
import { addDoc, collection } from 'firebase/firestore'


const dados = [
    {
        name: 'João',
        surname: 'Silva',
        email: 'joao.silva@gmail.com',
        phone: '(11) 91234-5678',
        area: 'Tecnologia',
        state: 'São Paulo',
        city: 'São Paulo',
        street: 'Rua A, 123',
        supplier: true
    },
    {
        name: 'Maria',
        surname: 'Souza',
        email: 'maria.souza@hotmail.com',
        phone: '(21) 99876-5432',
        area: 'Alimentação',
        state: 'Rio de Janeiro',
        city: 'Niterói',
        street: 'Rua B, 456',
        supplier: false
    },
    {
        name: 'Pedro',
        surname: 'Ferreira',
        email: 'pedro.ferreira@yahoo.com.br',
        phone: '(31) 98765-4321',
        area: 'Moda',
        state: 'Minas Gerais',
        city: 'Belo Horizonte',
        street: 'Rua C, 789',
        supplier: true
    },
    {
        name: 'Luciana',
        surname: 'Oliveira',
        email: 'luciana.oliveira@outlook.com',
        phone: '(19) 99999-9999',
        area: 'Beleza',
        state: 'São Paulo',
        city: 'Campinas',
        street: 'Rua D, 987',
        supplier: false
    },
    {
        name: 'Ricardo',
        surname: 'Ribeiro',
        email: 'ricardo.ribeiro@gmail.com',
        phone: '(41) 91234-5678',
        area: 'Educação',
        state: 'Paraná',
        city: 'Curitiba',
        street: 'Rua E, 654',
        supplier: true
    },
    {
        name: 'Amanda',
        surname: 'Gonçalves',
        email: 'amanda.goncalves@uol.com.br',
        phone: '(51) 98765-4321',
        area: 'Esportes',
        state: 'Rio Grande do Sul',
        city: 'Porto Alegre',
        street: 'Rua F, 321',
        supplier: false
    },
    {
        name: 'Daniel',
        surname: 'Santos',
        email: 'daniel.santos@hotmail.com',
        phone: '(81) 91234-5678',
        area: 'Arte',
        state: 'Pernambuco',
        city: 'Recife',
        street: 'Rua G, 147',
        supplier: true
    },
    {
        name: 'Carla',
        surname: 'Fernandes',
        email: 'carla.fernandes@gmail.com',
        phone: '(85) 99876-5432',
        area: 'Saúde',
        state: 'Ceará',
        city: 'Fortaleza',
        street: 'Rua H, 369',
        supplier: false
    }
]

export default function Test() {

    const handleWithConnections = async (id1, id2) => {
        let promises = []

        promises = dados.map(async dado => {
            const promise = await addDoc(collection(db, 'users'), dado)
            return promise
        })

        await Promise.all(promises)
    }

    return (
        <div>
            <button onClick={handleWithConnections}>click</button>
        </div>
    )
}
