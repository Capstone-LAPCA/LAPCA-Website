import React, { useRef, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FileUploader from "./FileUploader";

export default function CodeEditor(props){
    const python_default_code = `print("Hello World")`;

    const theme = createTheme({
        palette: {
          primary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
          },
        },
      });
      
    function getLanguage(){
        if(props.language === "py") return "python";
        return props.language.toLowerCase();
    }
    return(
    <div>
    <Paper sx={{  marginTop: "0px", fontSize: "20", overflow: "hidden" }}>
        <Editor
            height="65vh"
            defaultLanguage={getLanguage()}
            defaultValue={python_default_code}
            value={props.defaultCodeTemplate}
            language={getLanguage()}
            theme="vs-dark"
            onMount={props.handleEditorDidMount}
        />
    </Paper>

    {/* <Box sx={{ m: "13px", marginRight: "10px", textAlign: "right" }}>
        <FileUploader 
        setDefaultCodeTemplate = {props.setDefaultCodeTemplate}
        language={props.language.toLowerCase()}
        />
        <ThemeProvider theme={theme}>

            <Button variant="contained" onClick={props.sendCode} color="primary">
                <b>Submit Code</b>
            </Button>
            
        </ThemeProvider>
    </Box> */}

    </div>
    );
}