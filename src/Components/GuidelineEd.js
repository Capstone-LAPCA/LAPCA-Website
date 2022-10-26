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
export default function GuidelineEd(props) {
    
    
  return (
    <div style={{backgroundColor: "#111827"}}>
      <Dialog open={props.open} onClose={props.handleClose} >
        <DialogTitle style={{backgroundColor: "#050c1b", color: "white", borderTop: "1px solid aliceblue", borderLeft: "1px solid aliceblue", borderRight: "1px solid aliceblue"}}>{props.title}</DialogTitle>
        <DialogContent style={{backgroundColor: "#050c1b", borderLeft: "1px solid aliceblue", borderRight: "1px solid aliceblue"}}>
          <Paper sx={{ marginTop: "0px", fontSize: "20", width: "70vh"}}>
            <Editor
                height="40vh"
                value={" "}
                theme="vs-dark"
                minimap= {{ enabled: false }}

                // onMount={props.handleEditorDidMount}
            />
        </Paper>
        </DialogContent>
        <DialogActions style={{backgroundColor: "#050c1b", borderBottom: "1px solid aliceblue", borderLeft: "1px solid aliceblue", borderRight: "1px solid aliceblue"}}>
          <Button 
            onClick={props.handleClose}
            style={{color: 'aliceblue',
            width: "5%", height: "70%", }}>
            Cancel
            </Button>
          <Button 
          onClick={props.handleClose}
          style={{color:"aliceblue"}}>
            Save
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
