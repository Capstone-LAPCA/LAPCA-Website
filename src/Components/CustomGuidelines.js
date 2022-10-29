import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import '../Styles/RightSection.css';
import { ConstructionOutlined } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import GuidelineEd from "./GuidelineEd";
import GuidelineEdCustom from "./GuidelineEdCustom"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { alpha, styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import InputBase from '@mui/material/InputBase';
import Editor from "@monaco-editor/react";

export default function PredefinedGuidelines(props){

    return(
        <Paper
        elevation={8}
        sx={{
        textAlign: "left",
        m: "3px",
        marginTop: "0px",
        padding: "20px",
        paddingTop: "2px",
        boxShadow: "none",
        background: "#111827",
        color: "#b5c0d0",
        
        }}
        >
    <div style={{backgroundColor: "#111827", maxWidth: "auto"}}>
      <Dialog open={props.customOpen} onClose={props.handleCustomClose} sx={{ input: { minWidth: '70vh', maxWidth: 'auto'}}}>
        <DialogTitle 
          style={{backgroundColor: "#050c1b", 
                  color: "white", 
                  borderTop: "1px solid aliceblue", 
                  borderLeft: "1px solid aliceblue", 
                  borderRight: "1px solid aliceblue",
                  color: "white",
                  width: "auto"}}>
            <span> B Guideline Name</span>
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
                onChange={(event) => props.handleSetCustomCode(event)}
                onMount={props.handleGuidelineEditorDidMount}
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
            onClick={(event) => props.handleCustomSave(event)}
            style={{color:"aliceblue"}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        <p>Custom Guidelines</p>
        <div className="form-group">
            <FormGroup  sx={{ alignContent: "left"}}>
            {props.userGuideline.map(item=>{
                    return(
                      <div className="guideline-list-custom">
                        <FormControlLabel
                        style = {{minWidth: "300px"}} 
                        control={
                          <Checkbox
                              onChange={props.handleFormChange}
                              sx={{color: 'aliceblue'}}
                              id={item.id}
                          />
                        }
                        label={item.label}
                        />
                        <Button 
                          data-id = {item.id} 
                          key={item.id} 
                          onClick={(event) => props.handleCustomClickOpen(event, item.label, item.code, ["custom",item.id])} 
                          variant="contained" 
                          style={{ width: "5%", 
                                  height: "70%", 
                                  top: "50%", 
                                  padding: "5px",
                                  transform: "translate(-50%, -50%)", 
                                  background: "none", 
                                  border: "1px solid aliceblue", 
                                  borderRadius: "0.8rem"}}>
                                  
                          <EditIcon style={{color: 'aliceblue', scale: "70%"}} />
                          <b style={{textTransform: "capitalize", paddingRight: "5px"}}>Edit</b>
                        </Button>

                        <Button 
                          
                          onClick={(event) => props.handleDelete(event, item.id)} 
                          variant="contained" 
                          style={{ width: "8%", 
                                  height: "70%", 
                                  top: "50%", 
                                  padding: "5px",
                                  transform: "translate(-50%, -50%)", 
                                  background: "none", 
                                  border: "1px solid aliceblue", 
                                  borderRadius: "0.8rem"}}>
                                  
                          <DeleteIcon style={{color: 'aliceblue', scale: "70%", paddingLeft: "10px"}} />
                          <b style={{textTransform: "capitalize", paddingRight: "15px"}}>Delete</b>
                        </Button>
                      </div>
                    )
                  })

                }
            </FormGroup>
        </div>
        </Paper>
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