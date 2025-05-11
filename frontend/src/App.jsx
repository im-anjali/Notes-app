import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import { useContext } from "react";
import {AuthContext} from '../context/UserContextProvider'
function App() {
  const {currUser} = useContext(AuthContext);
  console.log( JSON.stringify(currUser));
  return (
   <>
   <BrowserRouter>
   <Routes>

   <Route path="/login" element={<Login />} />
   <Route path="/signup" element={<Signup />} />
     
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
