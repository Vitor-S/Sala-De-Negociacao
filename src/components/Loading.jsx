import React from 'react'

import { StyledLoading } from '../styles/components-styles'
import { motion } from 'framer-motion'

const DotTransition = {
    duration: 2, yoyo: Infinity, ease: "easeInOut"
};

export default function Loading() {
    return (
        <StyledLoading>
            <h2>Carregando</h2>
            <motion.div className="animation-container">
                <motion.span animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: .5, repeat: Infinity, ease: "easeInOut", delay: 0 }} />
            </motion.div>
        </StyledLoading>
    )
}
