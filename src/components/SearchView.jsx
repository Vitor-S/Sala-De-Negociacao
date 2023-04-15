import React from 'react'

//components
import Card from './Card'
import MeetingCard from './MeetingCard';

//styled
import { StyledSearchView } from '../styles/components-styles';

const users = [
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Vitor', surname: 'Silva', supplier: true},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Vitor', surname: 'Silva', supplier: true},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Vitor', surname: 'Silva', supplier: true},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Vitor', surname: 'Silva', supplier: true},
    {photo: 'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg', name: 'Vitor', surname: 'Silva', supplier: true},
]

export default function SearchView() {
    return (
        <StyledSearchView>
            <MeetingCard/>
        </StyledSearchView>
    )
}
