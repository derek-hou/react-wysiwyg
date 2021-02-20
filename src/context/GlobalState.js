import React, { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
    selectedText: '',
    selectedTextStart: '',
    selectedTextEnd: ''
}

// create context - bring this into other files and components to use it
export const GlobalContext = createContext(initialState);

// Provider component - so we can import into App.js
export const GlobalProvider = ({ children }) => { // children is destructured
    const [state, dispatch] = useReducer(AppReducer, initialState); // reducer uses dispatch

    // value property uses an object
    return (
    <GlobalContext.Provider value={{ // allows for tracks to be passed to deeper components        
        
    }}>
    {children}
    </GlobalContext.Provider>);
}