import React, { useRef, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


export default function CodeEditor(props){
  const editorRef = useRef(null);
    const theme = createTheme({
        palette: {
          primary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
          },
        },
      });
      
      function sendCode() {
        console.log("clicked")
        const code = editorRef.current.getValue();
        setViolation("Loading...")
        
        axios
          .post("http://127.0.0.1:3003//getResults", {
            code: code,
            language: props.language,
            form: props.formResult,
          })
          .then((res) => {
            console.log(res.data);
            setViolation(res.data)
          })
          .catch((err) => {
            console.log("Error",err);
          });
      }

    return(
    <div>
    <Paper sx={{  marginTop: "0px", fontSize: "20" }}>
        <Editor
            height="75vh"
            defaultLanguage={props.language.toLowerCase()}
            defaultValue={`print("Hello World")`}
            value={props.defaultCodeTemplate}
            language={props.language.toLowerCase()}
            theme="vs-dark"
            onMount={(editor)=>{ props.editorRef.current = editor;}}
        />
    </Paper>

    <Box sx={{ m: "13px", marginRight: "10px", textAlign: "right" }}>
        <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={sendCode} color="primary">
                Submit Code
            </Button>
        </ThemeProvider>
    </Box>
    </div>
    );
}