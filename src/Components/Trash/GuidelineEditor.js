import React, { useRef, useState } from "react"; 
import Paper from "@mui/material/Paper";
import Editor from "@monaco-editor/react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";


export default function GuidelineEditor(props){

    const theme = createTheme({
        palette: {
          primary: {
            // This is green.A700 as hex.
            main: '#1976d2',
          },
        },
      });

    return(
        <div>
        <Paper sx={{  marginTop: "0px", fontSize: "20" }}>
            <Editor
                height="25vh"
                value={" "}
                theme="vs-dark"
                // onMount={props.handleEditorDidMount}
            />

        </Paper>
        <span style={{margin:"15px",display: "flex", justifyContent: "right"}}>
                <ThemeProvider theme={theme}>
                    <Button  variant="contained">
                        Upload Guideline
                    </Button>
                </ThemeProvider>
        </span>

        </div>
        );

}