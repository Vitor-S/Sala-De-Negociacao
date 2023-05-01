import React, { useEffect, useRef, useState } from 'react'

import { StyledChat } from '../styles/styles'
import { StyledChatHeader, StyledContactCard, StyledMessage } from '../styles/components-styles'

import Header from '../components/Header'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { motion } from 'framer-motion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HandshakeIcon from '@mui/icons-material/Handshake';

import myApi from '../service/myApi'
import { db } from '../service/myFirebaseConfig'
import { doc, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Chat() {

    const [viewContactsState, setViewContactsState] = useState(false)

    const inputRef = useRef()
    const [text, setText] = useState()
    const [messages, setMessages] = useState()

    const location = useLocation();
    const userLoggedId = new URLSearchParams(location.search).get("logged");
    const userReceiverId = new URLSearchParams(location.search).get("receiver");

    const divMessagesRef = useRef()

    const [activeChatData, setActiveChatData] = useState()

    //scroll end
    useEffect(() => {
        if (divMessagesRef.current)
            divMessagesRef.current.scrollTop = divMessagesRef.current.scrollHeight
    }, [messages])

    //update messagem
    useEffect(() => {
        const collectionRef = collection(db, 'messages');
        const q = query(collectionRef, orderBy('createdAt'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let myMessages = [];

            snapshot.forEach((doc) => {
                const data = doc.data()

                if ((data.sender == userLoggedId && data.receiver == userReceiverId) ||
                    (data.sender == userReceiverId && data.receiver == userLoggedId)) {
                    myMessages.push({ ...data, id: doc.id });
                }
            });

            setMessages(myMessages);
        });

        return () => unsubscribe();
    }, [userReceiverId]);

    useEffect(() => {
        (async () => {
            if (userReceiverId) {
                const data = await myApi.getDocById('users', userReceiverId)
                setActiveChatData(data)
            }
        })()
    }, [userReceiverId])

    const handleSendMessage = async (ev) => {

        if (text.trim() != '') {
            const collectionRef = collection(db, 'messages')

            await addDoc(collectionRef, {
                sender: userLoggedId,
                receiver: userReceiverId,
                text: text,
                createdAt: new Date()
            })

            setText('');
            inputRef.current.value = ''

            myApi.setConnections(userLoggedId, userReceiverId)
        }
    };

    return (
        <StyledChat>
            <Header />
            <div className="container">
                <ContactManager userLoggedId={userLoggedId} userReceiverId={userReceiverId} />
                {
                    userReceiverId ?
                        <div className="right">
                            <ChatHeader data={activeChatData} />
                            <div ref={divMessagesRef} className="messages">
                                {
                                    viewContactsState ?
                                        <MobileContactManager userLoggedId={userLoggedId} userReceiverId={userReceiverId} /> : 
                                        messages && messages.map(mess => <Message key={mess.id} data={mess} logged={userLoggedId} />)
                                }
                            </div>
                            <div className="options">
                                <Button className='view-contacts-button'
                                    onClick={() => setViewContactsState(!viewContactsState)}>
                                    {
                                        viewContactsState ?
                                            <ExpandMoreIcon fontSize='large' style={{ color: "#000" }} /> :
                                            <ExpandLessIcon fontSize='large' style={{ color: "#000" }} />
                                    }
                                </Button>
                                <TextField
                                    className='input-message'
                                    onKeyUp={(ev) => {
                                        if (ev.key == 'Enter' && inputRef.current.value != '') handleSendMessage()
                                    }}
                                    inputRef={inputRef}
                                    onChange={(ev) => setText(ev.target.value)}
                                    sx={{ border: '1px solid #000' }} />
                                <Button
                                    onClick={handleSendMessage}
                                    sx={{ height: '55px' }}
                                    variant='contained'
                                    color="primary">
                                    Enviar
                                </Button>
                            </div>
                        </div> : window.innerWidth > 755 ?
                            <div className="right empty-right">
                                <>
                                    <HandshakeIcon fontSize='large' sx={{ color: 'gray' }} />
                                    <span >
                                        Sala de Negociação
                                    </span>
                                </>
                                <>
                                    <span>Precisa me mais parceiros ?</span>
                                    <Link to='/search'>clique aqui para procurar contatos</Link>
                                </>
                            </div> : <MobileContactManager userLoggedId={userLoggedId} userReceiverId={userReceiverId} />
                }
            </div>
        </StyledChat>
    )
}

function ChatHeader({ data }) {

    return data ? (
        <StyledChatHeader initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {
                data.PhotoUrl != '' ? <img src={data.PhotoUrl}/> : <img src="https://unicerrado.edu.br/wp-content/uploads/placeholder-unicerrado-redondo.png" alt="" />
            }
            
            <h3>{data.name + ' ' + data.surname}</h3>
        </StyledChatHeader>
    ) : null
}

function ContactManager({ userLoggedId }) {

    const [connections, setConnections] = useState()

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'users', userLoggedId), () => {
            (async () => {
                const myConnections = await myApi.getConnections(userLoggedId)
                setConnections(myConnections)
            })()
        })

        return unsubscribe
    }, [])

    return connections == undefined ?
        <div className='left'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontStyle: 'italic'
            }} />
        :
        <div className='left'>
            {
                connections && connections.map(con =>
                    <ContactCard key={con.id} data={con}  />)
            }
        </div>
}

function ContactCard({ data }) {

    const navigate = useNavigate()
    const userLoggedId = new URLSearchParams(window.location.search).get("logged");

    return (
        <StyledContactCard onClick={() => {
            navigate(`/chat?logged=${userLoggedId}&receiver=${data.id}`)
            // window.location.reload()
        }}
            whileHover={{ backgroundColor: '#636ed5', cursor: 'pointer' }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 5 }}>
            <div className="contact-picture-container">
                {
                    data.PhotoUrl ? <img src={data.PhotoUrl}/> : <img src="https://unicerrado.edu.br/wp-content/uploads/placeholder-unicerrado-redondo.png" alt="" />
                }
            </div>
            <div className="contact-info">
                <h3>{data.name} {data.surname}</h3>
            </div>
        </StyledContactCard>
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

function MobileContactManager({ userLoggedId }) {

    const [connections, setConnections] = useState()

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'users', userLoggedId), () => {
            (async () => {
                const myConnections = await myApi.getConnections(userLoggedId)

                myConnections.sort((a, b) => a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' }));

                console.log(myConnections)

                setConnections(myConnections)
            })()
        })

        return unsubscribe
    }, [])

    return connections == undefined ?
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontStyle: 'italic'
        }}
        /> :
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }}>
            <h4 style={{ width: "100%", textAlign: "center", margin: '10px 0' }}>Contatos</h4>
            {
                connections && connections.map(con =>
                    <ContactCard key={con.id} data={con} />)
            }
        </motion.div>
}