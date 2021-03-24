import React, { useEffect, useState } from 'react'

// Import Components
import Note from './Note'
import New from './New'
import Paper from '../components/Paper'

// Import Image
import PlusIcon from '../assets/icons/plus.svg'
import AddNoteImage from '../assets/icons/addnote.svg'
import { AnimatePresence, motion } from 'framer-motion'

export default function Home() {

    // Effect
    useEffect(() => {
        
        if (localStorage.getItem('simpleNotes')){
            setNotes(JSON.parse(localStorage.getItem('simpleNotes')))
        } else {

            let firstNote = [
                {
                    id: 1,
                    title: 'Hello There, Please Read Me! 🥺',
                    content: "I'm very glad that you have been kind enough to pay a visit to this little Sticky Notes App. Before you start sticking your own notes here, let me remind you about a fact you should know. Keep in mind that, this App doesn't have a Cloud Database of any sort. It uses your Browser's Local Storage to store your Notes. So, your Notes will not vanish if you refresh the Webpage, but it will vanish if you clear your Browser Data or Factory Reset your Device. So, you can use this to stick random texts temporarily (As long as you don't clear your Browser Data), but you shouldn't really use this tool to stick Notes that are highly important or anything that you might need to get back to in the far future. That's all for now. Now you can delete this one and start sticking your own notes. Have a Nice Day! ❤",
                    color: '#68d391'
                }
            ]

            localStorage.setItem('simpleNotes', JSON.stringify(firstNote))
            setNotes(JSON.parse(localStorage.getItem('simpleNotes')))
            
        }

    }, [])

    // States
    const [notes, setNotes] = useState([])
    const [showNew, setShowNew] = useState(false)
    const [paperContent, setPaperContent] = useState(null)

    // Functions
    const handleNewSectionClose = () => {
        setShowNew(false)
        setNotes(JSON.parse(localStorage.getItem('simpleNotes')))
    }

    const newSectionCloseWithoutSubmit = () => {
        setShowNew(false)
    }

    const handlePaperClose = () => {
        setPaperContent(null)
        setNotes(JSON.parse(localStorage.getItem('simpleNotes')))
    }
    

    return (
        
        <div className={`${ paperContent ? 'h-screen overflow-hidden' : '' }`}>
            
            { /* All Notes Section */ }

            { !showNew &&
                
                <div className="w-10/12 mx-auto pt-10 lg:pt-16 static">
                
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 z-10">

                        { notes &&
                        
                            <AnimatePresence>

                                { notes.map( (note, index) => {
                                    return (
                                        
                                        <motion.div 
                                        key={note.id} 
                                        onClick={()=>setPaperContent(note)}
                                        initial={{ opacity: 0, x: 100, y: 50 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ type: 'tween', duration: 0.25, delay: index * 0.1 }}
                                        >
                                            <Note title={note.title} content={note.content} color={note.color}/>
                                        </motion.div>
                                    )
                                })}

                            </AnimatePresence>
                        }

                    </div>
                        
                            
                                

                    { !paperContent && localStorage.getItem('simpleNotes') !== '[]' && 

                        <div className="w-10/12 fixed z-40 bottom-0 mx-auto mb-6 flex justify-center font-semibold">
                            <button onClick={()=>setShowNew(true)} className="w-48 h-14 bg-yellow-300 text-gray-800 rounded-full text-lg shadow border transform hover:bg-yellow-400 hover:scale-110 transition-all duration-300 border-gray-400 flex justify-center items-center">
                                <img className="h-5 mr-2" src={PlusIcon} alt=""/>
                                New Note
                            </button>
                        </div>

                    }

                    { localStorage.getItem('simpleNotes') == '[]' &&

                        <div className="w-full flex flex-col">
                            <img className="w-10/12 lg:w-1/3 mx-auto" src={AddNoteImage} alt=""/>
                            <h1 className="mt-10 text-xl text-center text-gray-700 w-10/12 mx-auto">No Sticky Note Found. Wanna Add Some?</h1>
                            <button onClick={()=>setShowNew(true)} className="w-48 h-14 mt-10 mx-auto bg-yellow-300 text-gray-800 rounded-full text-lg shadow border-2 hover:bg-yellow-400 border-gray-400 flex justify-center items-center">
                                <img className="h-5 mr-2" src={PlusIcon} alt=""/>
                                Add Note
                            </button>
                        </div>
                    }

                </div>
            }

            { /* New Note Section */ }

            { showNew && <New close={handleNewSectionClose} withoutSubmit={newSectionCloseWithoutSubmit}/>}

            { /* Expanded Note Section */ }
            
            <AnimatePresence>
                { paperContent && <Paper note={paperContent} close={handlePaperClose}/> }
            </AnimatePresence>

        </div>
    )
}
