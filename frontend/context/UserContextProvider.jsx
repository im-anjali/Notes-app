import React from 'react'
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext();
export function UserContextProvider({children}) {
       const [currUser, setcurrUser] = useState(null);
       useEffect(() =>{
         const userData  = JSON.parse(localStorage.getItem("user"));
         setcurrUser(userData);
       }, []);
       const updateUser = (data) => {
         setcurrUser(data);
         localStorage.setItem("user", JSON.stringify(data));
       }
       useEffect(() =>{
         if(currUser){
          localStorage.setItem("user", JSON.stringify(currUser));
         }else{
          localStorage.removeItem("user");
         }
       },[currUser])
            
        
  return (
    <div>
    <AuthContext.Provider value={{currUser, updateUser}}> 
      {children}
    </AuthContext.Provider>
      
     
      
       
    </div>
  )

}
