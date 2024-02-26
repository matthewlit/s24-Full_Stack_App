/**************************************************************************
  File: StateContext.js
  Author: Matthew Kelleher
  Description: Handles global user variable
**************************************************************************/

import React, { useState, createContext, useContext } from 'react'

// Create Context
const Context = createContext();

// Set Context
export const StateContext = ({ children }) => {

    const [user, setUser] = useState({uid: null, email: "None"});

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