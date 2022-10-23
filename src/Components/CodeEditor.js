import React, { useRef, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


export default function CodeEditor({language},{defaultCodeTemplate}){
    const theme = createTheme({
        palette: {
          primary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
          },
        },
      });

    const editorRef = useRef(null);
    const [violation,setViolation]=useState()

    function sendCode() {
        const code = editorRef.current.getValue();
        setViolation("Loading...")
        axios
          .post("https://lapca.herokuapp.com//getResults", {
            code: code,
            language: language,
            // form: formResult,
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
            defaultLanguage={language.toLowerCase()}
            defaultValue={`print("Hello World")`}
            value={defaultCodeTemplate}
            language={language.toLowerCase()}
            theme="vs-dark"
            onMount={(editor)=>{ editorRef.current = editor;}}
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