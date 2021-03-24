import React from 'react'

// Import Icons
import Logo from '../assets/icons/logo.svg'

export default function Navbar() {

    return (
        <nav className="h-16 w-screen border-b border-gray-200 bg-white shadow-sm fixed inset-0 z-30">
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex items-center">
                    <img className="h-8" src={Logo} alt=""/>
                    <h1 className="text-xl font-semibold ml-3">Stick It!</h1>
                </div>
            </div>
        </nav>
    )
}
