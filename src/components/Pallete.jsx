import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Pallete(props) {

    // States
    const colors = [ '#fc8181', '#f6ad55', '#f6e05e', '#68d391', '#4fd1c5', '#63b3ed', '#7f9cf5', '#b794f4', '#f687b3' ]

    // Functions
    const selectColor = (color) => {
        props.close(color)
    }

    return (

        <motion.div 
        className="bg-white rounded-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.75, type: 'spring' }}
        >

            <div className="w-full h-14 bg-gray-100 rounded-t-lg grid place-items-center border-b border-gray-200">
                <h1 className="text-lg font-medium text-gray-700">Select a Color</h1>
            </div>

            <div className="grid grid-cols-3 grid-rows-3 gap-7 m-8 lg:m-10">
                { colors.map( (color, index) => {
                    return (
                        <motion.div 
                        key={color} 
                        onClick={()=>selectColor(color)} 
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-full shadow cursor-pointer" 
                        style={{ backgroundColor: color }}
                        initial={{ opacity: 0, y: 10, }}
                        animate={{ opacity: 1, y: 0, }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        >
                        </motion.div>
                    )
                })}
            </div>

        </motion.div>
    )
}
