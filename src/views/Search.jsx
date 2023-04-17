import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

//components
import TextField from '@mui/material/TextField'
import Card from '../components/Card'
import Header from '../components/Header'
import { Autocomplete, Button } from '@mui/material'

//styled
import { StyledSearch } from '../styles/styles'

const users = [
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Vitor', surname: 'Silva', supplier: true, area: 'Hardware'},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Pedro', surname: 'Silva', supplier: true, area: 'Hardware'},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Alex', surname: 'Silva', supplier: true, area: 'Hardware'},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Alvaro', surname: 'Silva', supplier: true, area: 'Hardware'},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Luiz', surname: 'Silva', supplier: true, area: 'Hardware'},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Gustavo', surname: 'Silva', supplier: true, area: 'Hardware'},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Jesus', surname: 'Silva', supplier: true, area: 'Hardware'},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Josué', surname: 'Silva', supplier: true, area: 'Hardware'},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Marcos', surname: 'Vinicius', supplier: false, area: 'Hardware'},
]

export default function Search() {

    const [currentData, setCurrentData] = useState([])

    const [statesFilter, setStatesFilter] = useState(undefined)
    const [supplierFilter, setSupplierFilter] = useState(undefined)
    const [citiesFilter, setCitiesFilter] = useState(undefined)

    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])

    const supplierFilterRef = useRef()
    const statesFilterRef = useRef()
    const citiesFilterRef = useRef()

    // const apllyFilters = () => {
    //     const filters = [stateFilter, supplierFilter].filter(obj => obj != undefined)

    //     const wheres = filters.map(obj => {
    //         return(
    //             where(Object.keys(obj)[0], '==', Object.values(obj)[0])
    //         )
    //     })

    //     FirebaseGet(query(collection(db, 'users'), ...wheres), setCurrentData)
    // }

    const clearRefs = () => {
        supplierFilterRef.current.value = null
        statesFilterRef.current.value = null
        citiesFilterRef.current.value = null
    }

    const clearStates = () => {
        setStatesFilter('undefined')
        setSupplierFilter('undefined')
        setCitiesFilter('undefined')
    }

    useEffect(() => {
        // FirebaseGet(usersRef, setCurrentData)
        
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const list = []
            res.data.forEach(obj => list.push(obj.sigla))
            setStates(list.sort())
        })
    }, [])

    return (
        <StyledSearch>
            <Header/>    
            <div className="search-container">
                <div className="search-filters">
                    <div className="search-area">
                        <TextField
                            sx={{ width: '80% '}}
                            label="Pesquisar"
                        />
                    </div>
                    <div className="filters-area">

                        <Autocomplete 
                            name='supplier'
                            options={["Fornecedor", "Contratante"]}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField inputRef={supplierFilterRef} {...params} label="Tipo" />}
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
                            renderInput={(params) => <TextField inputRef={statesFilterRef} {...params} label="Estado" />}
                            onChange={(ev, value) => {
                                setStatesFilter(value != null ? {'state': value} : undefined)

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
                            renderInput={(params) => <TextField inputRef={citiesFilterRef} {...params} label="Cidade" />}
                            onChange={(ev, value) => setCitiesFilter(value != null ? value : undefined)}
                        />

                        <div className="handle-filters">
                            <Button color="error" onClick={() => {
                                clearRefs()
                                clearStates()
                            }}>
                                Limpar Filtros
                            </Button>
                            <Button color="primary"
                                onClick={() => {
                                    console.log('supplier: ' + supplierFilter.supplier)
                                    console.log('states: ' + statesFilter.state)
                                    console.log('cities: ' + citiesFilter)
                                }}>
                                Aplicar Filtros
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="search-results">
                    {
                        typeof users != 'undefined' && users.map(user => <Card user={user}/>)
                    }
                </div>
            </div>
        </StyledSearch>
    )
}
