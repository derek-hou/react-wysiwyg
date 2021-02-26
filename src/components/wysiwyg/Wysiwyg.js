import React, { useState, setState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useEvent } from '../useEvent';

/**
 * Instead of only using a mouse event on the textarea element for getting the selection,
 * I am using a window event for when a user leaves the textarea on the mouse up.
 */
export const Wysiwyg = () => {
    var selectedTextStart;
    var selectedTextEnd;
    var selectedText;
    var mousedownSrcElement;

    let [textAreaText, setTextAreaText] = useState('');
    let [historyArr, setHistory] = useState([]);

    const handleChange = (e) => {
        setTextAreaText(e.target.value);
    };
    
    const handleMouseSelectedDown = (e) => { 
        //console.log("mousedown", e);
        mousedownSrcElement = e.srcElement.name;
    }

    const handleMouseSelected = (e) => { 
        //console.log(e);
        try {
            if(e.target.name === 'wysiwyg') {
                selectedTextStart = e.target.selectionStart;
                selectedTextEnd = e.target.selectionEnd;
    
                selectedText = e.target.value.substring(selectedTextStart, selectedTextEnd);
                if(selectedText.length <= 0) {
                    return; // stop here if selection length is <= 0
                }
                
                // log the selection
                console.log("startPos: " + selectedTextStart, " | endPos: " + selectedTextEnd );
                console.log("selectedText: " +  selectedText);
            } else if(e.target.name === "wysiwyg" || mousedownSrcElement === "wysiwyg") { // check that mousedown is initiating from the text editor
                throw new Error('mouseup is outside of textarea');
            }
        } catch (error) {
            console.error(error);
        }
    }

    

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
                let strArr = str.split("\n");
                rtnStr = `<${tag}>`;
                strArr.map(item => rtnStr += `<li>${item}</li>`);
                rtnStr += `</${tag}>`;
            } else {
                rtnStr = `<${tag}><li>${str}</li></${tag}>`;
            }
        } else {
            rtnStr = `<${tag}>${str}</${tag}>`;
        }

        console.log("addHtmlTag", rtnStr);

        return rtnStr;
    } 

    let updateTextArea = (str, keyCode) => {
        try {            
            if(keyCode === 13) { // 13 = enter
                textAreaText += `<p></p>`;
                setTextAreaText(textAreaText);
                console.log("updateTextArea", textAreaText);
            } else if(selectedText.length > 0) {
                textAreaText = textAreaText.substr(0, selectedTextStart) + str + textAreaText.substr(selectedTextEnd, textAreaText.length);
                setTextAreaText(textAreaText);
            } else {
                throw new Error('selectedText is empty');
            }
        } catch(err) {
            console.error(err);
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
                let listText = addHtmlTag(selectedText, 'ul');
                updateTextArea(listText);
                setHistory(selectedText, 'ul');
                selectedText = '';
            } else {
                throw new Error('selectedText is empty');
            }
        } catch(err) {
            console.error(err);
        }
    }

    let orderedList = () => {
        try {
            if(selectedText.length > 0) { // check if any text is selected
                let listText = addHtmlTag(selectedText, 'ol');
                updateTextArea(listText);
                setHistory(selectedText, 'ol');
                selectedText = '';
            } else {
                throw new Error('selectedText is empty');
            }
        } catch(err) {
            console.error(err);
        }
    }

    let handleKeyPressed = (e) => {
        //e.stopPropagation();
        if(e.type === 'keydown' || e.type === 'keyup') {
            console.log(e);
            if(e.keyCode === 13) {
                updateTextArea(textAreaText, 13);
                setHistory('', 'p');
                console.log(textAreaText);
                
            }
        }
    }

    // window events
    useEvent('mousedown', handleMouseSelectedDown);
    useEvent('mouseup', handleMouseSelected);
    useEvent('keyup', handleKeyPressed);

    return (
        <div id="wysiwyg">
            <div>
                <button onClick={italicize}>i</button>
                <button onClick={bold}>b</button>
                <button onClick={unorderedList}>ul</button>
                <button onClick={orderedList}>ol</button>
            </div>
            <textarea className="wysiwyg-editor" name="wysiwyg" value={textAreaText} onChange={handleChange}></textarea>
            <div dangerouslySetInnerHTML={{__html: textAreaText}} />
            <ul>
                { historyArr.map((item, index) => 
                    <li key={index}>{item.selectedText} {item.tag}</li>
                )}
            </ul>
        </div>
    )
}
