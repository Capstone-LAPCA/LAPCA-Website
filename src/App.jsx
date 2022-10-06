import "./App.css";
import Editor from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import "./scrollbar.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize } from "@mui/system";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });

  const [formResult, setFormResult] = useState({
    "Recursion.lapx": false,
    "Assign_in_loop.lapx": false,
    "Continue.lapx": false,
    "Unused_Functions.lapx": false,
    "One_var_decl.lapx": false,
    "Binary_Search_Iterative.lapx": false,
    "Dead_Code.lapx": false,
    "var_greater_than_31.lapx": false,
  });
  const python_default_code = `print("Hello World")`;
  const c_default_code =
    `#include <stdio.h>\nint main(){\n\tprintf("Hello World");\n\treturn 0;\n}`;
  const java_default_code =
    `class TestProgram{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World");\n\t}\n}`;

  const editorRef = useRef(null);
  const [defaultLanguage, setDefaultLanguage] = useState("Python");
  const [defaultCodeTemplate, setDefaultCodeTemplate] = useState(python_default_code);
  const [violation,setViolation]=useState()
  
  function sendCode() {
    const code = editorRef.current.getValue();
    setViolation("Loading...")
    axios
      .post("https://lapca.herokuapp.com//getResults", {
        code: code,
        language: defaultLanguage,
        form: formResult,
      })
      .then((res) => {
        console.log(res.data);
        setViolation(res.data)
      })
      .catch((err) => {
        console.log("Error",err);
      });
  }

  function handleLanguageChange(event) {
    setDefaultLanguage(event.target.value);
    switch (event.target.value) {
      case "Python":
        setDefaultCodeTemplate(python_default_code);
        break;
      case "C":
        setDefaultCodeTemplate(c_default_code);
        break;
      case "Java":
        setDefaultCodeTemplate(java_default_code);
        break;
      default:
        setDefaultCodeTemplate(python_default_code);
    }
  }

  function handleFormChange(event) {
    let newFormResult = formResult;
    newFormResult[event.target.id] = event.target.checked;
    setFormResult(newFormResult);
    console.log(formResult);
  }

  return (
    //<div style={{ backgroundColor: "#383434" }}>
    <div>
      <div className="navbar">
        <p>LAPCA</p>
      </div>
      <div className="main-body">
        
        <div className="left-section">
          
        <FormControl
            sx={{
              marginBottom: "10px",
              marginTop: "20px",
              minHeight: 10,
              minWidth: 80,
              
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Language"
              value={defaultLanguage}
              onChange={handleLanguageChange}
              
            >
              <MenuItem value={"C"}>C</MenuItem>
              <MenuItem value={"Python"}>Python</MenuItem>
              <MenuItem value={"Java"}>Java</MenuItem>
            </Select>
          </FormControl>

          {/* <EditorComponent/> */}
          <Paper
                  sx={{  marginTop: "0px", fontSize: "20" }}
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

          <Box sx={{ m: "13px", marginRight: "10px", textAlign: "right" }}>
          <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={sendCode} color="primary">
              Submit Code
            </Button>
            </ThemeProvider>
          </Box>

        </div>
        <div className="right-section">
              <Paper
                  elevation={8}
                  sx={{
                    textAlign: "left",
                    m: "3px",
                    marginTop: "20px",
                    padding: "20px",
                    paddingTop: "2px",
                    boxShadow: "none",
                    background: "#111827",
                    color: "#b5c0d0"
                  }}
                >
                  <h2>Guidelines</h2>
                  <FormGroup sx={{ alignContent: "left" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleFormChange}
                          id="Recursion.lapx"
                        />
                      }
                      label="Check if recursion is used"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="var_greater_than_31.lapx"
                          onChange={handleFormChange}
                        />
                      }
                      label="Check if variable name exceeds 31 characters"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="Dead_Code.lapx"
                          onChange={handleFormChange}
                        />
                      }
                      label="Check for dead code"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="Assign_in_loop.lapx"
                          onChange={handleFormChange}
                        />
                      }
                      label="Check for assignment in loop"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="Binary_Search_Iterative.lapx"
                          onChange={handleFormChange}
                        />
                      }
                      label="Check if binary search iterative is implemented"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="Continue.lapx"
                          onChange={handleFormChange}
                        />
                      }
                      label="Check if continue statement is used"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="Unused_Functions.lapx"
                          onChange={handleFormChange}
                        />
                      }
                      label="Check for any unused functions"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="One_var_decl.lapx"
                          onChange={handleFormChange}
                        />
                      }
                      label="One variable declaration per line"
                    />
                  </FormGroup>
                </Paper>
              <Paper
                  elevation={8}
                  sx={{
                    m: "3px",
                    marginBottom: "0px",
                    minHeight: "290px",
                    padding: "20px",
                    paddingTop: "2px",
                    background: "#050c1b",
                    color: "rgb(255,255,255)",
                    resize: "both"
                  }}
                >
                  
                  <h2 style={{ textAlign: "left" }}>Output</h2>
                  <div style={{ whiteSpace:"pre-line", backgroundColor: "#111827", minHeight: "300px", padding: "10px",
                fontSize: "18px"}}>
                  <p >{violation}</p>
                  </div>
                </Paper>   
        </div> 
        
      </div>
    </div>
  );
}

export default App;
