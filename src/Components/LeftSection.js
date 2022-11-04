import React, { useRef, useState } from "react";


import Output from "./Output";
import LanguageSelect from "./LanguageSelect";
import CodeEditor from "./CodeEditor";

import "./../Styles/LeftSection.css"

export default function LeftSection(props){
    return(
    <div className="left-section">
        <LanguageSelect 
        editorRef={props.editorRef} 
        sendCode={props.sendCode} 
        handleLanguageChange={props.handleLanguageChange} 
        language={props.language}
        />
        
        <CodeEditor 
        language={props.language} 
        sendCode={props.sendCode} 
        defaultCodeTemplate={props.defaultCodeTemplate}  
        handleEditorDidMount={props.handleEditorDidMount}
        setDefaultCodeTemplate = {props.setDefaultCodeTemplate}/>

        <Output violation={props.violation} 
        isLoading={props.isLoading}
        language={props.language} 
        sendCode={props.sendCode} 
        defaultCodeTemplate={props.defaultCodeTemplate}
        setDefaultCodeTemplate = {props.setDefaultCodeTemplate}/>
        
    </div>
    );
}