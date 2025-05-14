import React, { useState } from 'react'
import { Link , useNavigate } from "react-router-dom";
// import {AuthContext} from '../../context/UserContextProvider';
import { useContext } from 'react';
import axios from "axios"

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const {currUser, updateUser} = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate("/login");
    const handleSubmit = async(e) => {
        e.preventDefault();
       try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {name, email, password})


        navigate("/home")
        console.log(name, email, password)
       } catch (error) {
        setError(error.response.data.message);
       }
    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900'>
            <div className='bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md'>
                <h1 className='text-2xl text-white text-center mb-6'>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label className='block text-gray-400  p-3 cursor-pointer' >Name</label>
                    <input id='name'
                        type='name'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='rounded-lg bg-gray-700 p-3  w-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-white-200'
                    >
                    </input>
                    <label className='block text-gray-400  p-3 cursor-pointer' htmlFor="email">Email</label>
                    <input id='email'
                        type='email'
                        placeholder='your@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='rounded-lg bg-gray-700 p-3  w-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-white-200'
                    >
                    </input>
                    <label className='block text-gray-400  p-3 cursor-pointer' htmlFor="email">Password</label>
                    <input id='password'
                        type='password'
                        placeholder='********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='rounded-lg bg-gray-700 p-3  w-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-white-200 '
                    >

                    </input>
                    <button
                        type="submit"
                        className=" w-full bg-white p-3 mt-7 rounded cursor-pointer  mb-5 transition duration-300"
                    >
                        Sign Up
                    </button>
                    <div className="text-gray-100 text-center">
                        <p>
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="text-white hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup
