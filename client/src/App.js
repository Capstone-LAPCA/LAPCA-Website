import './App.css';
import Editor from "@monaco-editor/react";
import React, { useRef } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function App() {
  const editorRef = useRef(null);

  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco)
    editorRef.current = editor; 
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

  function sendCode()
  {
    const code = editorRef.current.getValue();
    console.log(code);
    axios.post('http://localhost:5000/lapcarun', {code: code})
    .then(res => {
      console.log(res.data);
    })
  }
  
  function handleChange()
  {
    console.log("change");
  }

  return (
    <div style={{ backgroundColor: '' }}>
      <FormControl style={{margin:'20px', minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value={10}>C</MenuItem>
          <MenuItem value={20}>Python</MenuItem>
          <MenuItem value={30}>Java</MenuItem>
        </Select>
      </FormControl>
    <Box sx={{ zIndex: 1, m:'20px',width:'50%'}}>
    <Editor
      height="75vh"
      margin="20px"
      defaultLanguage="c"
      defaultValue="// some comment"
      theme='vs-dark'
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
    />
    </Box>
    <Button variant="contained" onClick={sendCode}>Submit</Button>
    <FormGroup >
      <FormControlLabel control={<Checkbox />} label="Recursion" />
      <FormControlLabel control={<Checkbox />} label="Variable greater than 31" />
      <FormControlLabel control={<Checkbox />} label="Dead Code" />
      <FormControlLabel control={<Checkbox />} label="Assignment in Loop" />
      <FormControlLabel control={<Checkbox />} label="Binary Search" />
      <FormControlLabel control={<Checkbox />} label="Continue statement" />
      <FormControlLabel control={<Checkbox />} label="Unused Functions" />
      <FormControlLabel control={<Checkbox />} label="" />
  </FormGroup>
    </div>
  );
}



export default App;
