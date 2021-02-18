import React, { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
    selectedText: '',
    selectedTextStart: '',
    selectedTextEnd: '',
    interpolatedText: 'asdf'
}

// create context - bring this into other files and components to use it
export const GlobalContext = createContext(initialState);

// Provider component - so we can import into App.js
export const GlobalProvider = ({ children }) => { // children is destructured
    const [state, dispatch] = useReducer(AppReducer, initialState); // reducer uses dispatch

    // get the selected positions within the text area and set it to the state
    const getSelectedPositions = (event) => {
        state.selectedTextStart = event.target.selectionStart;
        state.selectedTextEnd = event.target.selectionEnd;

        state.selectedText = event.target.value.substring(state.selectedTextStart, state.selectedTextEnd);
        if(state.selectedText.length <= 0) {
            return; // stop here if selection length is <= 0
        }
        
        // log the selection
        console.log("startPos: " + state.selectedTextStart, " | endPos: " + state.selectedTextEnd );
        console.log("selectedText: " +  state.selectedText);

    }

    /* const italicize = () => {
        console.log("startPos: " + state.selectedTextStart, " | endPos: " + state.selectedTextEnd );
        console.log("selectedText: " +  state.selectedText);
    } */

    // value property uses an object
    return (
    <GlobalContext.Provider value={{ // allows for tracks to be passed to deeper components        
        getSelectedPositions,
        selectedText: state.selectedText
    }}>
    {children}
    </GlobalContext.Provider>);
}