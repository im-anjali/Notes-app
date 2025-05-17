import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";
function AddNote() {
    
    const [heading, setHeading] = useState('');
   const currentDate = new Date().toISOString();
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!heading.trim() || !content.trim()){
            alert("Both heading and content are required.");
            return;
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/note/createnote`, { heading, content , currentDate});
              setHeading('');
              navigate("/home");
      setContent('');
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <div className='bg-gray-900 min-h-screen '>
                <h1 className='text-gray-300 text-3xl pl-20 pt-15'>Heading</h1>
                {/* <button  className='bg-white fixed bottom-15 right-15 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer'><IoArrowBackCircleSharp /></button> */}
                <form >
                    <div className='pl-20 mt-10 pr-20'>
                        <input
                            id='heading'
                            type='heading'
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            className='rounded-lg bg-gray-900 p-3  w-full  text-white foutline-none ring-2 ring-white/20'

                        >
                        </input>
                    </div>
                    {/* <h1 className='text-gray-300 text-3xl pl-40 pt-15'>Note</h1>   */}
                    <div className='pl-20 mt-10 pr-20'>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note here..."
                            className='rounded-lg bg-gray-900 p-3 w-full h-120 text-white ring-2 ring-white/20 resize-none'
                        />
                    </div>
                    <div className='flex justify-end mt-4 pr-20'>
                    <button
                        className="bg-white text-black px-10 py-3 rounded-lg cursor-pointer shadow hover:bg-gray-100 transition duration-200"
                        onClick={handleSubmit}
                    >    
                        Submit
                    </button>
                    </div>



                </form>
            </div>

        </div>
    )
}

export default AddNote
