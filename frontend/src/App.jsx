import { BrowserRouter,  Route, Routes, useParams } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import { useContext } from "react";
import {AuthContext} from '../context/UserContextProvider'
import AddNote from './pages/AddNote';
import Home from './pages/Home';
import ShowNote from './pages/ShowNote';
import UpdateNote from './pages/UpdateNote';
function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>

   <Route path="/home" element={<Home/>}/>
   <Route path="/addnote" element={<AddNote/>}/>
   <Route path="/" element={<Login />} />
   <Route path="/signup" element={<Signup />} />
    < Route path='/shownote/:id' element={<ShowNote/>}/>
    <Route path='/updatenote/:id' element={<UpdateNote/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
