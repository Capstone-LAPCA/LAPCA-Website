import Editor from "@monaco-editor/react";
import Paper from "@mui/material/Paper";
import React, { useRef, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function EditorComponent(){
    const python_default_code = `print("Hello World")`;
    const c_default_code =
        `#include <stdio.h>\nint main(){\n\tprintf("Hello World");\n\treturn 0;\n}`;
    const java_default_code =
        `class TestProgram{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World");\n\t}\n}`;

    const editorRef = useRef(null);
    const [defaultLanguage, setDefaultLanguage] = useState("Python");
    const [defaultCodeTemplate, setDefaultCodeTemplate] = useState(python_default_code);

    

    return (
        <>
        
        
        <Paper
                elevation={12}
                sx={{ marginLeft: "70px", marginRight: "0px" }}
        >
        <Editor
                  height="75vh"
                  
                  defaultLanguage={defaultLanguage.toLowerCase()}
                  defaultValue={python_default_code}
                  value={defaultCodeTemplate}
                  language={defaultLanguage.toLowerCase()}
                  theme="vs-dark"
                  onMount={(editor)=>{ editorRef.current = editor;}}
        />
        </Paper>
        </>
    )
}