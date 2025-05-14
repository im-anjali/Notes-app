import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import { useContext } from "react";
import {AuthContext} from '../context/UserContextProvider'
import AddNote from './pages/AddNote';
import Home from './pages/Home';
function App() {

  return (
   <>
   <BrowserRouter>
   <Routes>

   <Route path="/home" element={<Home/>}/>
   <Route path="/addnote" element={<AddNote/>}/>
   <Route path="/" element={<Login />} />
   <Route path="/signup" element={<Signup />} />
     
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
