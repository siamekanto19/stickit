import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Paper({ note, close }) {

    // Effects

    useEffect(() => {
        
        setAllNotes(JSON.parse(localStorage.getItem('simpleNotes')))
        
        return () => {
            setAllNotes([])            
        }

    }, [])


    // States
    const [noteDeleted, setNoteDeleted] = useState(false)
    const [allNotes, setAllNotes] = useState([])
    
    // Functions

    const handleClose = (e) => {
        if (e.target.id == 'parent') {
            close()
        }
    }

    const deleteNote = () => {
        let updatedNotes = allNotes.filter( el => el.id !== note.id )
        localStorage.removeItem('simpleNotes')
        localStorage.setItem('simpleNotes', JSON.stringify(updatedNotes))
        close()
    }

    return (
        
        <motion.div 
        onClick={handleClose} 
        className="fixed top-0 w-screen h-screen bg-black bg-opacity-95 text-gray-800 z-30 overflow-y-scroll" 
        id="parent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
            
            <AnimatePresence>
                <motion.div 
                className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 mx-auto p-8 my-32 rounded-lg shadow-md relative z-40" 
                style={{ backgroundColor: note.color }}
                initial={{  opacity: 0, y: 100 }}
                animate={{  opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5, type: 'spring', delay: 0.3 }}
                >
                        
                    <h1 className="text-3xl font-semibold text-center">{note.title}</h1>
                    <p className="mt-8 text-lg">{note.content}</p>
                    
                    <div className="w-full flex justify-between lg:justify-around mt-10">
                        <button onClick={()=>close()} className="w-32 lg:w-40 h-12 border-2 border-gray-700 rounded-full text-gray-700 font-medium text-lg transform hover:scale-110 transition-all duration-200">Close</button>
                        <button onClick={deleteNote} className="w-32 lg:w-40 h-12 border-2 border-gray-700 rounded-full text-gray-700 font-medium text-lg transform hover:scale-110 transition-all duration-200">Delete</button>
                    </div>

                </motion.div>
            </AnimatePresence>

        </motion.div>
    )
}
