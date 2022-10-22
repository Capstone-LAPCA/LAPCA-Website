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
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "./scrollbar.css"
function App() {
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
    <div className="main-body">
      <FormControl
        sx={{
          marginBottom: "60px",
          marginTop: "20px",
          marginLeft: "20px",
          minWidth: 120,
        }}
      >
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
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
      <Grid container spacing={6} direction="row">
        <Grid xs={7}>
          <Grid container direction="column">
            <Grid>
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
            </Grid>
            <Grid xs={13}>
              <Box sx={{ m: "30px", marginRight: "30px", textAlign: "right" }}>
                <Button variant="contained" onClick={sendCode}>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={5}>
          <Grid>
            <Grid>
              <Paper
                elevation={8}
                sx={{
                  textAlign: "left",
                  m: "3px",
                  marginTop: "0px",
                  padding: "20px",
                  paddingTop: "2px",
                  boxShadow: "none",
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
            </Grid>
            <Grid>
              <Paper
                elevation={8}
                sx={{
                  m: "3px",
                  marginBottom: "0px",
                  minHeight: "150px",
                  padding: "20px",
                  paddingTop: "1px",
                  
                }}
              >
                <h2 style={{ textAlign: "left" }}>Output</h2>
                <div style={{ whiteSpace:"pre-line" }}>
                <p >{violation}</p>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
