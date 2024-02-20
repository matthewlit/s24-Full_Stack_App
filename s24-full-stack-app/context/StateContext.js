import React, { useState, createContext, useContext } from 'react'

// Create Context
const Context = createContext();

// Set Context
export const StateContext = ({ children }) => {

    const [user, setUser] = useState(null);

    return (
        <Context.Provider 
            value = {{
                user, setUser
            }}
            >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);