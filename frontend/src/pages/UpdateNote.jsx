import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5"; function UpdateNote() {
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
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
                setHeading(res.data.heading);
                setContent(res.data.content);



            } catch (err) {
                console.error("Failed to fetch notes:", err.response?.data || err.message);
            }
        };

        fetchNotes();
    }, []);
    const UpdateNote = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("no token found");
                return;
            }
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/note/updatenote/${id}`,
                { heading, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }
  const navigateHome = () =>{
    navigate("/home");
  }

    return (

        <div>
            <div className='bg-gray-900 min-h-screen '>
                <div className='flex items-center  pl-10 p-5 pr-40 pt-5'>
                    <button onClick={navigateHome}>
                        <IoArrowBackCircle fill='white' className='text-4xl cursor-pointer' />
                    </button>
                   
                </div>
                 <h1 className='text-gray-300 text-3xl pl-20 ' >Edit Note</h1>

                {/* <button  className='bg-white fixed bottom-15 right-15 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer'><IoArrowBackCircleSharp /></button> */}
                <form onSubmit={UpdateNote}>
                    <div className='pl-20 mt-10 pr-20'>
                        <input
                            id='heading'
                            type='text'
                            value={heading}

                            onChange={(e) => setHeading(e.target.value)}
                            className='rounded-lg bg-gray-900 p-3  w-full  text-white foutline-none ring-2 ring-white/20'

                        />
                    </div>
                    {/* <h1 className='text-gray-300 text-3xl pl-40 pt-15'>Note</h1>   */}
                    <div className='pl-20 mt-10 pr-20'>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            // placeholder="Write your note here..."

                            className='rounded-lg bg-gray-900 p-3 w-full h-120 text-white ring-2 ring-white/20 resize-none'
                        />
                    </div>
                    <div className='flex justify-end mt-4 pr-20'>
                        <button 
                            className="bg-white text-black px-10 py-3 rounded-lg cursor-pointer shadow hover:bg-gray-100 transition duration-200" >
                            Save Changes
                        </button>
                    </div>



                </form>
            </div>
        </div>
    )
}

export default UpdateNote;
