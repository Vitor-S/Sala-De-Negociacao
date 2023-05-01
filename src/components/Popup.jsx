import React from 'react'

import { PopupStyle } from '../styles/components-styles'

export default function Popup({ state, children }) {
    return state ? (
        <PopupStyle initial={{ scale: 0 }} animate={{ scale: 1 }}>
            {children}
        </PopupStyle>
    ) : null
}
