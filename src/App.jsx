import React from 'react'

// Import Components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="App">
      <Navbar/>
      <main className="mt-20">
        <Home/>
      </main>
    </div>
  )
}

export default App
