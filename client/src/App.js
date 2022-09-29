import "./App.css";
import Editor from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function App() {
  const python_default_code = "#Python code";
  const c_default_code =
    '#incude <stdio.h>\nint main(){\n\tprintf("Hello World");\n\treturn 0;\n}';
  const java_default_code =
    '//DO NOT CHANGE THE BELOW CLASS NAME\npublic class TestProgram{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World");\n\t}\n}';

  const editorRef = useRef(null);
  const [defaultLanguage, setDefaultLanguage] = useState("python");
  const [defaultCodeTemplate, setDefaultCodeTemplate] =
    useState(python_default_code);

  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco);
    editorRef.current = editor;
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

  function sendCode() {
    const code = editorRef.current.getValue();
    console.log(code);
    axios
      .post("http://localhost:5000/lapcarun", {
        code: code,
        language: defaultLanguage,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  function handleLanguageChange(event) {
    setDefaultLanguage(event.target.value);
    if (event.target.value === "python") {
      setDefaultCodeTemplate(python_default_code);
    }
    if (event.target.value === "c") {
      setDefaultCodeTemplate(c_default_code);
    }
    if (event.target.value === "java") {
      setDefaultCodeTemplate(java_default_code);
    }
  }

  return (
    <div style={{ backgroundColor: "" }}>
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
          <MenuItem value={"c"}>C</MenuItem>
          <MenuItem value={"python"}>Python</MenuItem>
          <MenuItem value={"java"}>Java</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={6} direction="row">
        <Grid xs={6}>
          <Grid direction="column" alignItems="center">
            <Grid xs={12}>
              <Paper
                elevation={12}
                sx={{ marginLeft: "70px", marginRight: "20px" }}
              >
                <Editor
                  height="75vh"
                  defaultLanguage={defaultLanguage}
                  defaultValue={python_default_code}
                  value={defaultCodeTemplate}
                  theme="vs-dark"
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  beforeMount={handleEditorWillMount}
                />
              </Paper>
            </Grid>
            <Grid xs={12}>
              <Box sx={{ m: "30px", marginRight: "30px", textAlign: "right" }}>
                <Button variant="contained" onClick={sendCode}>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={6}>
          <Grid direction="column">
            <Grid>
              <Paper
                elevation={8}
                sx={{
                  textAlign: "center",
                  m: "50px",
                  marginTop: "0px",
                  padding: "20px",
                }}
              >
                <h2>Guidelines</h2>
                <FormGroup sx={{ alignContent: "center" }}>
                  <FormControlLabel control={<Checkbox />} label="Recursion" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Variable greater than 31"
                  />
                  <FormControlLabel control={<Checkbox />} label="Dead Code" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Assignment in Loop"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Binary Search"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Continue statement"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Unused Functions"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="One variable declaration per line"
                  />
                </FormGroup>
              </Paper>
            </Grid>
            <Grid>
              <Paper
                elevation={8}
                sx={{
                  m: "50px",
                  marginBottom: "0px",
                  minHeight: "120px",
                  padding: "20px",
                }}
              >
                <h2 style={{ textAlign: "center" }}>Output</h2>
                <p id="outputArea"></p>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
