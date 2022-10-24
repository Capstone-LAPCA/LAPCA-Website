import React, { useRef, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


export default function CodeEditor(props){
    const theme = createTheme({
        palette: {
          primary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
          },
        },
      });
      

    return(
    <div>
    <Paper sx={{  marginTop: "0px", fontSize: "20" }}>
        <Editor
            height="75vh"
            defaultLanguage={props.language.toLowerCase()}
            defaultValue={props.defaultCodeTemplate}
            value={props.defaultCodeTemplate}
            language={props.language.toLowerCase()}
            theme="vs-dark"
            onMount={props.handleEditorDidMount}
        />
    </Paper>

    <Box sx={{ m: "13px", marginRight: "10px", textAlign: "right" }}>
        <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={props.sendCode} color="primary">
                Submit Code
            </Button>
        </ThemeProvider>
    </Box>
    </div>
    );
}