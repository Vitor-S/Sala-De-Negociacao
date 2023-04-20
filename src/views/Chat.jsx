import React, { useEffect, useRef, useState } from 'react'

import { StyledChat } from '../styles/styles'
import { StyledMessage } from '../styles/components-styles'

import Header from '../components/Header'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { motion } from 'framer-motion'

import { db } from '../service/Api'
import { collection, addDoc, query, orderBy, getDocs, onSnapshot, limit } from 'firebase/firestore'
import { useLocation } from 'react-router-dom'


export default function Chat({ userLogged, userClicked }) {

    const inputRef = useRef()
    const [text, setText] = useState()
    const [messages, setMessages] = useState()

    const location = useLocation();
    const userLoggedId = new URLSearchParams(location.search).get("logged");
    const userReceiverId = new URLSearchParams(location.search).get("receiver");

    useEffect(() => {
        const collectionRef = collection(db, 'messages');
        const q = query(collectionRef, orderBy('createdAt'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let myMessages = [];

            snapshot.forEach((doc) => {
                if ((doc.data().sender == userLoggedId && doc.data().receiver == userReceiverId) ||
                    (doc.data().sender == userReceiverId && doc.data().receiver == userLoggedId)) {
                    myMessages.push({ ...doc.data(), id: doc.id });
                }
            });

            setMessages(myMessages);
        });

        return () => unsubscribe();
    }, []);

    const handleSendMessage = async (ev) => {

        const collectionRef = collection(db, 'messages')

        await addDoc(collectionRef, {
            sender: userLoggedId,
            receiver: userReceiverId,
            text: text,
            createdAt: new Date()
        })

        setText('');
        inputRef.current.value = ''
    };

    return (
        <StyledChat>
            <Header />
            <div className="container">
                <div className="left"></div>
                <div className="right">
                    <div className="messages">
                        {
                            messages && messages.map(mess =>
                                <Message key={mess.id} data={mess} logged={userLoggedId} />)
                        }
                    </div>
                    <div className="options">
                        <TextField
                            onKeyUp={(ev) => {
                                if (ev.key == 'Enter') handleSendMessage()
                            }}
                            inputRef={inputRef}
                            onChange={(ev) => setText(ev.target.value)}
                            sx={{ width: '80%', border: '1px solid #000' }} />
                        <Button
                            onClick={handleSendMessage}
                            sx={{ height: '55px' }}
                            variant='contained'
                            color="primary">
                            Enviar
                        </Button>
                    </div>
                </div>
            </div>
        </StyledChat>
    )
}

function ContactManager(){
    return(
        <>
        </>
    )
}

function Message({ data, logged }) {

    return (
        <StyledMessage owner={data.sender == logged}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {data.text}
            </motion.div>
        </StyledMessage>
    )
}