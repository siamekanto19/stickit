import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Import Images

import Pallete from '../components/Pallete'

export default function New(props) {

    // Effect

    useEffect(() => {
        
        if (!localStorage.getItem('simpleNotes')) {
            localStorage.setItem('simpleNotes', '[]')
        } else { 
            setAllNotes(JSON.parse(localStorage.getItem('simpleNotes')))
        }

    },[])

    // States
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedColor, setSelectedColor] = useState('#cbd5e0')
    const [showingPallete, setShowingPallete] = useState(false)
    const [allNotes, setAllNotes] = useState([])
    const [contentError, setContentError] = useState(false)

    //Functions
    
    const closePallete = (color) => {
        setShowingPallete(false)
        setSelectedColor(color)
    }

    const handleSubmit = () => {

        if (!content) {

            setContentError(true)
            document.getElementById('contentarea').classList.add('border-red-500')

        } else {

            if (document.getElementById('contentarea').classList.contains('border-red-500')){
                document.getElementById('contentarea').classList.remove('border-red-500')
            }

            setContentError(false)
            
            let newNote = {
                id: nanoid(),
                title: title,
                content: content,
                color: selectedColor
            }
            
            setAllNotes(allNotes.push(newNote))
    
            localStorage.removeItem('simpleNotes')
            localStorage.setItem('simpleNotes', JSON.stringify(allNotes))
    
            props.close()
        }
        
        

    }

    const closeWithoutSubmit = () => {
        props.withoutSubmit()
    }

    return (
        <div className="w-11/12 md:w-3/4 lg:w-2/3 2xl:w-1/2 mx-auto text-gray-800">
            
            <div className="w-full mx-auto flex flex-col">
                
                { /* New Note Form Starts Here*/ }
                
                <div className="w-full flex flex-col mx-auto">
                    
                    <input onChange={(e)=>setTitle(e.target.value)} className="w-3/4 h-16 mx-auto border-b-2 border-gray-200 px-5 text-3xl font-semibold text-center mt-5 focus:border-gray-400" placeholder="Enter Note Title" type="text"/>
                    <textarea onChange={(e)=>setContent(e.target.value)} className="w-full h-48 md:h-48 border-b-2 border-gray-200 px-5 text-left text-xl mt-10 focus:border-gray-400" placeholder="Enter Note Content" id="contentarea"></textarea>
                    
                    <div className="flex justify-center items-center mt-10 text-lg font-semibold">
                        <h1>Select Color :</h1>
                        <div onClick={()=>setShowingPallete(true)} className="w-10 h-10 border border-gray-300 shadow rounded-full ml-4 cursor-pointer transform hover:scale-110 duration-200" style={{ backgroundColor: selectedColor }}></div>
                    </div>

                    <AnimatePresence>
                        
                        { showingPallete && 
                            
                            <motion.div 
                            className="fixed inset-0 w-screen h-screen bg-black bg-opacity-95 grid place-items-center z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, type: 'tween' }}
                            >
                                <AnimatePresence>
                                    <Pallete close={closePallete}/>
                                </AnimatePresence> 
                                
                            </motion.div>
                        }

                    </AnimatePresence>
                    
                    <div className="lg:w-1/2 flex lg:mx-auto justify-between">
                        <motion.button 
                        onClick={handleSubmit} 
                        className="w-36 lg:w-44 h-14 bg-yellow-300 rounded-full text-gray-800 text-lg mx-auto mt-10 shadow border-2 border-gray-400"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, type: 'tween'}}
                        whileHover={{ scale: 1.1 }}
                        >+ ADD Note
                        </motion.button>
                        <motion.button 
                        onClick={closeWithoutSubmit} 
                        className="w-36 lg:w-44 h-14 rounded-full text-gray-800 text-lg mx-auto mt-10 shadow border-2 border-gray-400"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, type: 'tween'}}
                        whileHover={{ scale: 1.1 }}
                        >Cancel
                        </motion.button>
                    </div>
                
                </div>
            </div>

            <AnimatePresence>
                { contentError &&

                    <motion.div 
                    className="w-10/12 md:w-3/4 lg:W-2/3 xl:w-1/2 2xl:w-1/3 bg-red-500 rounded-lg h-12 grid place-items-center mx-auto mt-10 lg:mt-20"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.5, type: 'tween' }}
                    >
                        <h1 className="text-white text-base font-semibold">Note Content cannot be Empty!</h1>
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}
