import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
    const handleClick = async(e) =>{
       navigate("/addnote")
  }
  const [notes, setNotes] = useState([]);
   useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found in local storage");
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/note/getnotes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
                setNotes(res.data)

        console.log(notes);
        


      } catch (err) {
        console.error("Failed to fetch notes:", err.response?.data || err.message);
      }
    };
    
    fetchNotes();
  }, []);
  return (
    
    <div className='bg-gray-900 min-h-screen'>
       <h1 className='text-left text-white ml-30 pt-13 text-4xl '>Notes App</h1>
        <ul>
        {notes?.map((note) => (
          <li key={note._id} className="border-b py-2">
            <strong>{note.heading}</strong>: {note.content}
          </li>
        ))}
      </ul>
       <button className='bg-white fixed bottom-15 right-15 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer' onClick={handleClick}><IoAddOutline className="text-3xl"/></button>
    </div>
  )
}

export default Home
