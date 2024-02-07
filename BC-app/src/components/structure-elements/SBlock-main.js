import { useState, useEffect } from "react";
import React from 'react';
import "../../pages/main-page/Main-page.css"
    
const SBlock = () => {
    const [fileContent, setFileContent] = useState('');
    
    useEffect(() => {
    fetch("./texts/fish.txt")
    .then(response => response.text())
    .then(data => setFileContent(data))
    .catch(error => console.error('Ошибка при чтении файла', error));
    }, []);
    return(
        <div id='structure-block-main'>
            <h1>Text</h1>
            <span>{fileContent}</span>
        </div> 
        
    );
}

export default SBlock