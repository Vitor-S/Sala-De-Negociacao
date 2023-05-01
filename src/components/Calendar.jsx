import React, { useEffect, useState } from 'react'
import { meetingValidation } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { StyledCalendar, StyledCalendarBack, StyledMeetingCard, StyledViewMeetings } from '../styles/components-styles'

import { useForm } from 'react-hook-form'

import { addDoc, collection, where } from 'firebase/firestore';
import myApi from '../service/myApi';
import { db } from '../service/myFirebaseConfig';


export default function Calendar({ userLoggedId, profileOwner, disabled }) {

    const [userLoggedData, setUserLoggedData] = useState()
    const [visibleFront, setVisibleFront] = useState(true)
    const [dayClicked, setDayClicked] = useState()

    useEffect(() => {
        (async () => {
            const doc = await myApi.getDocById('users', userLoggedId)
            setUserLoggedData(doc)
        })()
    }, [])
    
    const [date, setDate] = useState(new Date())
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
                sx={{ fontFamily: 'Dosis', fontSize: '1.2rem' }}
                color="primary"
                disabled={
                    (i < today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) || (date.getFullYear() < today.getFullYear()) || (date.getFullYear() == today.getFullYear() && date.getMonth() < today.getMonth()) || disabled
                }
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
                            {
                                userLoggedData && userLoggedId == profileOwner.id ?
                                    <span>Reuniões de {userLoggedData.name}</span> :
                                    <span>
                                        {captalize(date.toLocaleString('default', { month: 'long' }))} {date.getFullYear()}
                                    </span> 
                            }
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
                            {
                                userLoggedId == profileOwner.id ?
                                    <div className='view-mettings-button-container'>
                                        <Button onClick={() => setVisibleFront(false)}
                                            className='view-mettings-button' 
                                            variant='contained' >
                                            <VisibilityIcon /> Ver Reuniões
                                        </Button>
                                    </div>
                                    : days
                            }
                        </div>
                    </>
                ) : <CalendarBack
                    setVerse={setVisibleFront}
                    day={dayClicked || today}
                    sender={userLoggedData || ''}
                    receiver={profileOwner || ''} />
            }
        </StyledCalendar>
    )
}

export function CalendarBack({ setVerse, day, sender, receiver }) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(meetingValidation)
    })

    return (
        <StyledCalendarBack>
            <form onSubmit={
                handleSubmit(async (data) => {
                    const finalData = {
                        sender: sender.id,
                        receiver: receiver.id,
                        message: data.message,
                        date: {
                            day: day.getDate(),
                            month: day.getMonth(),
                            year: day.getFullYear()
                        },
                        tecnology: '',
                    }
                    const docRef = await addDoc(collection(db, "meetings"), finalData)
                        .then(res => alert('Reunião Marcada'))
                })
            }>
                <div className="calendarback-header">
                    <EventNoteIcon />
                    Reunião para {day.toLocaleString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="calendarback-options">

                    <Button
                        startIcon={<ArrowBackIosNewIcon fontSize='small' />}
                        className="back"
                        onClick={() => setVerse(true)}>
                        Voltar
                    </Button>
                    {
                        sender.id != receiver.id ?
                            <Button
                                startIcon={<EventAvailableIcon />}
                                className="add-event"
                                type='submit'>
                                Enviar
                            </Button> : null
                    }
                </div>
                <div className="calendarback-events">
                    {
                        sender.id != receiver.id ?
                            <>
                                <div className="contact-people">
                                    <Chip avatar={<PersonIcon />} label={sender.name + ' ' + sender.surname} variant="outlined" />
                                    <TrendingFlatIcon />
                                    <Chip avatar={<PersonIcon />} label={receiver.name + ' ' + receiver.surname} variant="outlined" />
                                </div>
                                <div className="date-info">
                                    <div>
                                        <span>Data da reunião: </span>
                                        {day.toLocaleString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                </div>
                                <div className="message">
                                    <TextField
                                        error={Boolean(errors.message)}
                                        helperText={errors.message?.message}
                                        type='submit'
                                        fullWidth
                                        placeholder="Escreva uma mensagem..."
                                        multiline
                                        rows={7}
                                        {...register('message')}
                                    />
                                </div>
                            </> : <ViewMeetings userLoggedId={sender.id} />
                    }
                </div>
            </form>
        </StyledCalendarBack>
    )
}

export function ViewMeetings({ userLoggedId }) {

    const [myMeetings, setMyMeetings] = useState()

    useEffect(() => {
        (async () => {
            const data = await myApi.getMultiples('meetings',
                [where('sender', '==', userLoggedId), where('receiver', '==', userLoggedId)], '||')
            setMyMeetings(data)
        })()
    }, [])

    return (
        <StyledViewMeetings>
            {
                myMeetings ?
                    myMeetings && myMeetings.map(meet => <MeetingCard data={meet} />) :
                    <div>Você não possu i reuniões</div>
            }
        </StyledViewMeetings>
    )
}

export function MeetingCard({ data }) {
    const [senderData, setSenderData] = useState()
    const [receiverData, setReceiverData] = useState()

    useEffect(() => {
        (async () => {
            const docSender = await myApi.getDocById('users', data.sender)
            setSenderData(docSender)
            const docReceiver = await myApi.getDocById('users', data.receiver)
            setReceiverData(docReceiver)
        })()
    }, [])

    return (
        <>
            {
                senderData && receiverData ?
                    <StyledMeetingCard>
                        <div>Solicitante: {senderData.name} {senderData.surname}</div>
                        <div>Destinatário: {receiverData.name} {receiverData.surname}</div>
                        <span>Data da reunião: {data.date.day}/{data.date.month}/{data.date.year}</span>

                        <div>Mensagem: </div>
                        <span className='meeting-message'>{data.message}</span>

                    </StyledMeetingCard> : null
            }
        </>
    )
}