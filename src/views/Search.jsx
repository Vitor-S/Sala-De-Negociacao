import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import myApi from '../service/myApi'

import { getFirestore, collection, getDocs } from 'firebase/firestore'

//components
import TextField from '@mui/material/TextField'
import Card from '../components/Card'
import Header from '../components/Header'
import { Autocomplete, Button } from '@mui/material'

//styled
import { StyledSearch } from '../styles/styles'

const db = getFirestore()

export default function Search() {
    const navigate = useNavigate()

    const [currentData, setCurrentData] = useState([])

    const [statesFilter, setStatesFilter] = useState(undefined)
    const [supplierFilter, setSupplierFilter] = useState(undefined)
    const [citiesFilter, setCitiesFilter] = useState(undefined)

    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])

    const apllyFilters = () => {
        const filters = [citiesFilter, statesFilter, supplierFilter].filter(obj => obj != undefined)

        console.log(filters)

        // const wheres = filters.map(obj => {
        //     return(
        //         where(Object.keys(obj)[0], '==', Object.values(obj)[0])
        //     )
        // })

        // FirebaseGet(query(collection(db, 'users'), ...wheres), setCurrentData)
    }
    
    useEffect(() => {
        //getting states for the filter
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const list = []
            res.data.forEach(obj => list.push(obj.sigla))
            setStates(list.sort())
        })
    }, [])
    
    useEffect(() => {
        (async () => {
            const data = await myApi.getMultiples('users', [], '')
            setCurrentData(data)
        })()
    }, [])

    return (
        <StyledSearch>
            <Header/>    
            <div className="search-body">
                <div className="search-filters">
                    <div className="search-area">
                        <TextField
                            sx={{ width: '80%'}}
                            label="Pesquisar"
                        />
                    </div>
                    <div className="filters-area">

                        <Autocomplete 
                            name='supplier'
                            options={["Fornecedor", "Contratante"]}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField {...params} label="Tipo" />}
                            onChange={(ev, value) => 
                                setSupplierFilter(value == 'Fornecedor' ? {'supplier': true} :
                                    value == 'Contratante' ? {'supplier': false} : undefined)}
                        />

                        <Autocomplete
                            name='area'
                            options={["area1", "area2"]}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField {...params} label="Área" />}
                        />

                        <Autocomplete
                            title='state'
                            options={states}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField {...params} label="Estado" />}
                            onChange={(ev, value) => {
                                if(value != null) setStatesFilter({'state': value})

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

                        <Autocomplete
                            disabled={statesFilter == undefined}
                            name='city'
                            options={cities}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField {...params} label="Cidade" />}
                            onChange={(ev, value) => {
                                if(value != null) setStatesFilter({city: value})
                            }}
                        />

                        <div className="handle-filters">
                            <Button 
                                fullWidth
                                color="primary"
                                onClick={apllyFilters}>
                                    Aplicar Filtros
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="search-results">
                    {
                        typeof currentData != 'undefined' && 
                        currentData.map(user => <Card key={user.id} user={user}/>)
                    }
                </div>
            </div>
        </StyledSearch>
    )
}
