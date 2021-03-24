import React from 'react'

export default function Note(props) {
    
    const getRandom = () => {
        
        let random = Math.random()
        
        if (random < 0.5) {
            random = 0
        } else {
            random = 1
        }

        return random
    }

    return (
        
        <div className={`w-full p-5 text-lg rounded-lg hover:border cursor-pointer hover:border-gray-600 transform relative z-10 hover:z-20 duration-200 shadow-md ${ getRandom() ? 'rotate-12' : '-rotate-12' }`} style={{ backgroundColor: props.color }}>
            <h1 className="text-2xl font-medium text-gray-800 text-center">{props.title}</h1>
            <p className="mt-5 text-gray-800 line-clamp-5">{props.content}</p>
        </div>
    )
}
