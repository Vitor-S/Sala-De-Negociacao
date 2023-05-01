import React from 'react'

import ErrorRobot from '../assets/Error robot.png'
import { motion } from 'framer-motion'
import { StyledError } from '../styles/styles'

const animation = {
    y: [0, -100, -100, -90, 50, 0, 100, 150, 100, 0],
    x: [0, -100, 100, -80, 0, 50, 100, -100, 0],
}

export default Error = () => {
    return (
        <StyledError>
            <h3>Verifique a url ou tente novamente mais tarde</h3>
            <motion.div
                animate={animation}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}>
                <img src={ErrorRobot}/>
            </motion.div>
        </StyledError>
    )
};