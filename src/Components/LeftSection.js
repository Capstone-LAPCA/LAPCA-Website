import React, { useRef, useState } from "react";



import LanguageSelect from "./LanguageSelect";
import CodeEditor from "./CodeEditor";

import "./../Styles/LeftSection.css"

export default function LeftSection(){
    const [language,setLanguage]=useState("py")
    const [defaultCodeTemplate, setDefaultCodeTemplate] = useState(`print("Hello World")`);
    return(
    <div className="left-section">
        <LanguageSelect setDefaultCodeTemplate={setDefaultCodeTemplate} setLanguage={setLanguage} language={language}/>
        <CodeEditor language={language} defaultCodeTemplate={defaultCodeTemplate}/>
    </div>
    );
}