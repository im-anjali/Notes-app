import React from "react";
const UserContext = React.createContext();
    const [user, setUser] = React.useState(null);
    
export default UserContext;