import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import myApi from '../service/myApi'

import { where } from 'firebase/firestore'

//components
import TextField from '@mui/material/TextField'
import Card from '../components/Card'
import Header from '../components/Header'
import { Autocomplete, Button } from '@mui/material'

//styled
import { StyledSearch } from '../styles/styles'

export default function Search() {
    const navigate = useNavigate()

    const [currentData, setCurrentData] = useState([])

    const [firstName, setFirstName] = useState(undefined)
    const [secondName, setSecondName] = useState(undefined)
    const [statesFilter, setStatesFilter] = useState(undefined)
    const [supplierFilter, setSupplierFilter] = useState(undefined)
    const [citiesFilter, setCitiesFilter] = useState(undefined)
    const [areasFilter, setAreasFilter] = useState(undefined)

    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])
    const [areas, setAreas] = useState([])

    const applyFilters = async () => {

        const filters = [firstName, secondName, supplierFilter, citiesFilter, statesFilter, areasFilter].filter(obj => obj != undefined)

        const myWheres = filters.map(fil => {
            return where(Object.keys(fil)[0], '==', Object.values(fil)[0])
        })

        const data = await myApi.getConditional('users', myWheres, '')
        setCurrentData(data)
    }

    const clearFilters = async () => {
        const data = await myApi.getExcept('users')
        setCurrentData(data)
    }

    useEffect(() => {
        (async () => {
            const areas = await myApi.getAllAttributes('area')

            const semRepeticoes = areas.filter((element, index, self) => {
                return index === self.indexOf(element);
            });

            setAreas(semRepeticoes)
        })()
    }, [])


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
            let data = await myApi.getExcept("users")
            setCurrentData(data)
        })()
    }, [])

    return (
        <StyledSearch>
            <Header />
            <div className="search-body">
                <div className="search-filters">
                    <div className="search-area">
                        <TextField
                            sx={{ width: '80%' }}
                            label="Nome"
                            onChange={(ev) => {
                                if (ev.target.value != null){
                                    setFirstName({'name': ev.target.value.trim().split(" ")[0]})
                                }
                                if (ev.target.value.trim().split(" ")[1] != null){
                                    setSecondName({'surname': ev.target.value.trim().split(" ")[1]})
                                }
                            }}
                        />
                    </div>
                    <div className="filters-area">

                        <Autocomplete
                            name='supplier'
                            options={["Fornecedor", "Contratante"]}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField {...params} label="Tipo" />}
                            onChange={(ev, value) =>
                                setSupplierFilter(value == 'Fornecedor' ? { 'supplier': true } :
                                    value == 'Contratante' ? { 'supplier': false } : undefined)
                            }
                        />

                        <Autocomplete
                            name='area'
                            options={areas}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField {...params} label="Área" />}
                            onChange={(ev, value) => {
                                if (value != null) setAreasFilter({ 'area': value })
                            }}
                        />

                        <Autocomplete
                            title='state'
                            options={states}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField {...params} label="Estado" />}
                            onChange={(ev, value) => {
                                if (value != null) setStatesFilter({ 'state': value })

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
                            disabled={statesFilter == undefined}
                            name='city'
                            options={cities}
                            sx={{ width: '80%' }}
                            renderInput={(params) => <TextField {...params} label="Cidade" />}
                            onChange={(ev, value) => {
                                if (value != null) setCitiesFilter({ city: value })
                            }}
                        />

                        <div className="handle-filters">
                            <Button
                                fullWidth
                                color="error"
                                onClick={clearFilters}>
                                Limpar Filtros
                            </Button>
                            <Button
                                fullWidth
                                color="primary"
                                onClick={() => {
                                    applyFilters()
                                    console.log(currentData)
                                }}>
                                Aplicar Filtros
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="search-results">
                    {
                        currentData && currentData.map(user => <Card key={user.id} user={user} />)
                    }
                </div>
            </div>
        </StyledSearch>
    )
}
