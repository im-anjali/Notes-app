import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
function Home() {
  const navigate = useNavigate();
    const handleClick = async(e) =>{
       navigate("/addnote")
  }
const showNote = (id) => {
  navigate(`/shownote/${id}`);
};
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

        


      } catch (err) {
        console.error("Failed to fetch notes:", err.response?.data || err.message);
      }
    };
    
    fetchNotes();
  }, []);
  const logout = () =>{
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    
    <div className='bg-gray-900 min-h-screen'>
       <div className="flex justify-between items-center px-20 py-10 bg-gray-900">
  <h1 className="text-white text-4xl">Notes App</h1>
<button className="text-white text-2xl px-6 py-2 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer" onClick={logout}>
  Logout
</button>
</div>

        <div className='pr-20 pl-20 pt-10  '>
        <ul className="space-y-4">
        {notes?.map((note) => (
          <li key={note._id}   onClick={() => showNote(note._id)}         
           className="cursor-pointer h-20 p-5 w-full  rounded-2xl shadow-lg text-white backdrop-blur-md bg-white/10 transition duration-300 ease-in-out hover:bg-white/20">
           <h1 className='text-lg pl-3  ' >{note.heading}</h1>
          </li>
        ))}
      </ul>
      </div>
       <button className='bg-white  fixed bottom-15 right-15 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer' onClick={handleClick}><IoAddOutline className="text-3xl"/></button>
    </div>
  )
}

export default Home
