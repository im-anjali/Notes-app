import React from 'react'
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate("/addnote");
  const handleClick = async(e) =>{
       navigate("/addnote")
  }
  return (
    
    <div className='bg-gray-900 min-h-screen'>
       <h1 className='text-eft text-white ml-30 pt-13 text-4xl '>Notes App</h1>
       <button className='bg-white fixed bottom-15 right-15 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer' onClick={handleClick}><IoAddOutline className="text-3xl"/></button>
    </div>
  )
}

export default Home
