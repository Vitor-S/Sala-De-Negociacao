import React, { useState } from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import { StyledCalendar, StyledCalendarBack } from '../styles/components-styles'


export default function Calendar({ state }) {

    const [date, setDate] = useState(new Date())
    const [visibleFront, setVisibleFront] = useState(true)
    const [dayClicked, setDayClicked] = useState()

    const today = new Date()

    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    function getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay() - 0;
    }

    function handlePrevMonth() {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    }

    function handleNextMonth() {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    }

    function captalize(string) {
        return string[0].toUpperCase() + string.substring(1)
    }

    const daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
    const firstDayOfMonth = getFirstDayOfMonth(date.getMonth(), date.getFullYear());

    let days = []

    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div></div>)
    }

    for (let i = 1; i < daysInMonth + 1; i++) {
        days.push(
            <IconButton
                disabled={
                    (i < today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) || (date.getFullYear() < today.getFullYear()) || (date.getFullYear() == today.getFullYear() && date.getMonth() < today.getMonth())
                }
                sx={{ fontFamily: 'Dosis', fontSize: '1.2rem' }}
                color="primary"
                onClick={() => {
                    setDayClicked(new Date(date.getFullYear(), date.getMonth(), i))
                    setVisibleFront(false)
                }}
            >
                {i}
            </IconButton>
        )
    }

    return (
        <StyledCalendar>
            {
                visibleFront ? (
                    <>
                        <div className="calendar-header">
                            <button className='arrow' onClick={handlePrevMonth}>
                                <ArrowBackIosNewIcon fontSize='small' />
                            </button>
                            <button onClick={() => setDate(new Date())} className="back_today">Hoje</button>
                            <span>
                                {captalize(date.toLocaleString('default', { month: 'long' }))} {date.getFullYear()}
                            </span>
                            <button className='arrow' onClick={handleNextMonth}>
                                <ArrowForwardIosIcon fontSize='small' />
                            </button>
                        </div>
                        <div className="calendar-weekdays">
                            <div>Dom</div>
                            <div>Seg</div>
                            <div>Ter</div>
                            <div>Qua</div>
                            <div>Qui</div>
                            <div>Sex</div>
                            <div>Sab</div>
                        </div>
                        <div className="calendar-days">
                            {days}
                        </div>
                    </>
                ) : <CalendarBack
                        setVerse={setVisibleFront} 
                        day={dayClicked} 
                        sender='Usuário Logado'
                        addressee={`${state.name} ${state.surname}`} />
            }
        </StyledCalendar>
    )
}

export function CalendarBack({ setVerse, day, sender, addressee }) {

    return (
        <StyledCalendarBack>
            <div className="calendarback-header">
                <EventNoteIcon/>
                Reunião para {day.toLocaleString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="calendarback-options">
                <button className="back" onClick={() => setVerse(true)}>
                    <ArrowBackIosNewIcon fontSize='small' />
                </button>
                <button className="add-event">
                    <EventAvailableIcon />
                </button>
            </div>
            <div className="calendarback-events">
                <div className="contact-people">
                    <Chip avatar={<PersonIcon/>} label={sender} variant="outlined" />
                    <TrendingFlatIcon/>
                    <Chip avatar={<PersonIcon/>} label={addressee} variant="outlined" />
                </div>
                <div className="date-info">
                    <div>
                        <span>Data da reunião: </span>
                        {day.toLocaleString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </div>
                <div className="message">
                    <TextField
                        fullWidth
                        placeholder="Escreva uma mensagem..."
                        multiline
                        rows={7}
                    />
                </div>
            </div>
        </StyledCalendarBack>
    )
}
