import React from 'react'
import { Outlet } from "react-router-dom";
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  return (
    <div id="page-container" className='justify-center flex'>
        <div id="page-content" className='max-w-7xl'>
            <header className='h-30 w-screen flex p-5 cursor-pointer' onClick={() => navigate("/")}>
                <ChatBubbleLeftRightIcon className='h-8 mr-3 text-colorPrimary'/> <p className='font-bold text-2xl font-display'>Débattons</p>
            </header>
            <main className='m-5 mt-0'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default App