import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";

function ShowNote() {
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found in local storage");
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/note/getnotebyid/${id}`, {
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
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("no token found");
        return;
      }
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/note/deletenote/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error deleting note:", error.response?.data || error.message);
    }
  }
  const handleUpdate = () => {
    navigate(`/updatenote/${id}`)
  }
  const navigateHome = () => {
    navigate("/home");
  }

  return (

    <div>
      <div className='bg-gray-900 min-h-screen '>
        {/* Top row: back button (left) and edit/delete buttons (right) */}
<div className="flex justify-between items-center pl-10 pr-10 pt-5">
  {/* Back Button on the Left */}
  <button onClick={navigateHome}>
    <IoArrowBackCircle fill="white" className="text-4xl cursor-pointer" />
  </button>

  {/* Edit/Delete Buttons on the Right */}
  <div className="flex gap-3">
    <button className="w-16 h-16 rounded-full cursor-pointer">
      <CiEdit fill="white" className="text-4xl" onClick={handleUpdate} />
    </button>
    <button className="w-16 h-16 rounded-full cursor-pointer">
      <MdDeleteOutline fill="white" className="text-4xl" onClick={handleDelete} />
    </button>
  </div>
</div>

{/* Heading below the buttons */}
<div className="pl-20 pt-5">
  <h1 className="text-gray-300 text-3xl ">Heading</h1>
</div>


        {/* <button  className='bg-white fixed bottom-15 right-15 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer'><IoArrowBackCircleSharp /></button> */}
        <form >
          <div className='pl-20 mt-10 pr-20'>
            <input
              id='heading'
              type='text'
              value={notes.heading}

              // onChange={(e) => setHeading(e.target.value)}
              className='rounded-lg bg-gray-900 p-3  w-full  text-white foutline-none ring-2 ring-white/20'

            />
          </div>
          {/* <h1 className='text-gray-300 text-3xl pl-40 pt-15'>Note</h1>   */}
          <div className='pl-20 mt-10 pr-20'>
            <textarea
              id='content'
              value={notes.content}
              // onChange={(e) => setContent(e.target.value)}
              // placeholder="Write your note here..."

              className='rounded-lg bg-gray-900 p-3 w-full h-120 text-white ring-2 ring-white/20 resize-none'
            />
          </div>




        </form>
      </div>
    </div>
  )
}

export default ShowNote;
