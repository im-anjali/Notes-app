import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
 import {AuthContext} from '../../context/UserContextProvider';
import axios from "axios"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {currUser, updateUser} = useContext(AuthContext);
     const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {email, password}, {withCredentials:true});
      const token = res.data.token;
      if(token){
        localStorage.setItem("token", token);

      }else{
        console.error("no token received");
        
      }
      const user = {
        ...res.data.user,
        token:res.data.token,
      };
      updateUser(user);
        navigate("/home")
    

    } catch (error) {
      console.error("error:", error);
      setError(error.response ? error.response.data.msg : "login failed")
    
    }

  }

   
  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-900'>
        <div className='bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md'>
          <h1 className='text-2xl text-white text-center mb-6'>Login</h1>
          <form onSubmit={handleSubmit}>
            <label className='block text-gray-400  p-3 cursor-pointer' htmlFor="email">Email</label>
            <input id='email'
              type='email'
              placeholder='your@example.com'
              value={email}
              onChange={(e) =>{setEmail(e.target.value )} }
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
              Sign In
            </button>
            <div className="text-gray-100 text-center">
              <p>
                Don't have an Account?{" "}
                <Link
                  to="/signup"
                  className="text-white hover:underline"
                >
                  Signup
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </>

  )
}




export default Login
