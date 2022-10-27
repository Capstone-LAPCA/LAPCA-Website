import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from "@mui/material/Paper";
import Editor from "@monaco-editor/react";
import '../Styles/RightSection.css'
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default function GuidelineEd(props) { 

  return (
    <div style={{backgroundColor: "#111827", maxWidth: "auto"}}>
      <Dialog open={props.open} onClose={props.handleClose} sx={{ input: { minWidth: '70vh', maxWidth: 'auto'}}}>
        <DialogTitle 
          style={{backgroundColor: "#050c1b", 
                  color: "white", 
                  borderTop: "1px solid aliceblue", 
                  borderLeft: "1px solid aliceblue", 
                  borderRight: "1px solid aliceblue",
                  color: "white",
                  width: "auto"}}>
            <span>Guideline Name</span>
            <BootstrapInput fullWidth
                            // readOnly = {false}
                            onChange = {(event) => props.handleSetTitle(event)}
                            sx={{ input: { color: 'white'}}} 
                            value = {props.title}
                            id="bootstrap-input" />
          
        </DialogTitle>
        <DialogContent 
          style={{backgroundColor: "#050c1b", 
                  borderLeft: "1px solid aliceblue", 
                  borderRight: "1px solid aliceblue",
                  }}>
          <Paper sx={{ marginTop: "0px", fontSize: "20"}}>
            <Editor
                height="40vh"
                value={props.code}
                theme="vs-dark"
                minimap= {{ enabled: false }}
                onChange={(event) => props.handleSetCode(event)}
                onMount={props.handleEditorDidMount}
            />
        </Paper>
        </DialogContent>
        <DialogActions 
          style={{backgroundColor: "#050c1b", 
                  borderBottom: "1px solid aliceblue", 
                  borderLeft: "1px solid aliceblue", 
                  borderRight: "1px solid aliceblue"}}>
          <Button 
            onClick={props.handleClose}
            style={{color: 'aliceblue',
            width: "5%", height: "70%", }}>
            Cancel
          </Button>
          <Button 
            onClick={props.handleSave}
            style={{color:"aliceblue"}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor:  '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    maxWidth: 'auto',
    padding: '10px 12px',
    color: 'white',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));