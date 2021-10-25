import React, { createContext, useState, useEffect } from "react";
import { get_user } from './api/User'


const UserContext = React.createContext();

export function UserProvider({ children }) {
    
    const [user_id, setUserID] = useState('');
    const [token, setToken] = useState('');

    return (
        <UserContext.Provider value={{user_id, setUserID, token, setToken}}>
            {children}
        </UserContext.Provider>
    )
}
