import React from 'react'
import {AuthContext} from '../context/UserContextProvider'

function Home() {
    const {currUser} = useContext(AuthContext);
      console.log("current use is:" + currUser);
  return (
    <div>
      
    </div>
  )
}

export default Home
