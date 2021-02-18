import React, { useState, setState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';


export const Wysiwyg = () => {
    //const { italicize } = useContext(GlobalContext);
    //const { getSelectedPositions } = useContext(GlobalContext);

    var selectedTextStart;
    var selectedTextEnd;
    var selectedText;
    //let [selectedText, getSelectedPositions] = useState('');
    /* let [italicText, italicize] = useState('');
    let [boldText, bold] = useState(''); */
    let [textAreaText, setTextAreaText] = useState('');
    let [historyArr, setHistory] = useState([]);
    
    const handleChange = (e) => {
        setTextAreaText(e.target.value);
    };
    
    setHistory = (str, tag) => {
        historyArr = addHistory(str, tag);
        //console.log(historyArr);
    }

    let addHistory = (str, tag) => {
        if(str !== null) {
            historyArr.push({
                selectedText: str,
                tag: tag
            });
        }

        return historyArr;
    }

    let addHtmlTag = (str, tag) => {
        let rtnStr;

        if(tag === '') {
            rtnStr = str;
        } else if(tag === 'ul' || tag === 'ol') {
            if(str.indexOf("\n") > 0) {
                //console.log(str.indexOf("\n"));
                let strArr = str.split("\n");
                //console.log(strArr);
                rtnStr = `<${tag}>`;
                strArr.map(item => rtnStr += `<li>${item}</li>`);
                rtnStr += `</${tag}>`;
            }
        } else {
            rtnStr = `<${tag}>${str}</${tag}>`;
        }

        return rtnStr;
    }

    let getSelectedPositions = (e) => {
        
        selectedTextStart = e.target.selectionStart;
        selectedTextEnd = e.target.selectionEnd;
        
        selectedText = e.target.value.substring(selectedTextStart, selectedTextEnd);
        if(selectedText.length <= 0) {
            return; // stop here if selection length is <= 0
        }
        
        // log the selection
        console.log("startPos: " + selectedTextStart, " | endPos: " + selectedTextEnd );
        console.log("selectedText: " + selectedText);

    }

    let getShortcut = (e) => {
        console.log(e)
    }

    let updateTextArea = (str) => {
        try {        
            if(selectedText.length > 0 && selectedTextEnd > 0) {
                textAreaText = textAreaText.substr(0, selectedTextStart) + str + textAreaText.substr(selectedTextEnd, textAreaText.length);
                setTextAreaText(textAreaText);
            } else {
                throw new Error('selectedText is empty');
            }
        } catch(err) {
            console.error(err)
        }
    } 

    let italicize = () => {
        try {
            if(selectedText.length > 0) { // check if any text is selected
                let italicText = addHtmlTag(selectedText, 'i');
                updateTextArea(italicText);
                setHistory(selectedText, 'i');
                selectedText = '';
            } else {
                throw new Error('selectedText is empty');
            }
        } catch(err) {
            console.error(err);
        }
    }
    
    let bold = () => {
        try {
            if(selectedText.length > 0) { // check if any text is selected
                let boldText = addHtmlTag(selectedText, 'b');
                updateTextArea(boldText);
                setHistory(selectedText, 'b');
                selectedText = '';
            } else {
                throw new Error('selectedText is empty');
            }
        } catch(err) {
            console.error(err);
        }
    }

    let unorderedList = () => {
        try {
            if(selectedText.length > 0) { // check if any text is selected
                let boldText = addHtmlTag(selectedText, 'ul');
                updateTextArea(boldText);
                setHistory(selectedText, 'ul');
                selectedText = '';
            } else {
                throw new Error('selectedText is empty');
            }
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <>
            <button onClick={italicize}>i</button>
            <button onClick={bold}>b</button>
            <button onClick={unorderedList}>ul</button>
            <textarea className="editor" onMouseUp={getSelectedPositions} onKeyUpCapture={getShortcut} value={textAreaText} onChange={handleChange}></textarea>
            <div dangerouslySetInnerHTML={{__html: textAreaText}} />
            <ul>
                { historyArr.map((item, index) => 
                    <li key={index}>{item.selectedText} {item.tag}</li>
                )}
            </ul>
        </>
    )
}
