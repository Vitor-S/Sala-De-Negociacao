import React from 'react'
import { CalendarBack } from '../components/Calendar'

export default function Test() {
  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <CalendarBack setVerse={null} day={new Date()} sender={'vitor'} addressee={'tulio'}/>
    </div>
  )
}
