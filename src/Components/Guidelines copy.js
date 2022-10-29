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
import DeleteIcon from '@mui/icons-material/Delete';
import GuidelineEdCustom from "./GuidelineEdCustom"

export default function Guidelines(props){
    const [guidelineType, setGuidelineType] = React.useState("predefined");
    const theme = createTheme({
        palette: {
            primary: {
            main: '#1976d2',
            },
        },
        });

    
    useEffect(()=>{
        props.getGuidelines();
    },[])

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
          <GuidelineEd open = {props.open} 
                       handleClose = {props.handleClose} 
                       title={props.title} 
                       userGuideline = {props.userGuideline}
                       code = {props.code}
                       values = {props.values}
                       handleSave = {props.handleSave}
                       handleSetTitle = {props.handleSetTitle}
                       handleSetCode = {props.handleSetCode}
                       handleGuidelineEditorDidMount = {props.handleGuidelineEditorDidMount}
                       handleCustomSave = {props.handleCustomSave}
                       />
          <div className="guideline-header">
            <h1>Guidelines</h1>
            <Button variant="contained" 
              onClick={(event) => props.handleClickOpen(event, "New_guideline.lapx")}
              style={{ 
                      height: "40%", 
                      top: "50%", 
                      padding: "5px",
                      transform: "translate(-50%, -50%)", 
                      background: "#11cb5f", 
                      borderRadius: "0.7rem"
                      }}>
              <AddIcon style={{scale: "80%",color: "black"}}/>
              <b style={{textTransform: "capitalize", paddingRight: "5px", color: "black"}}>Add</b>
            </Button>
          </div>
            
            <div className="form-group">

              <FormGroup  sx={{ alignContent: "left"}}>

                 {
                    props.guideline.map(item=>{
                    return(
                      <div className="guideline-list">
                        <FormControlLabel
                        style = {{minWidth: "400px"}} 
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
                          onClick={(event) => props.handleClickOpen(event, item.label, item.lapx_code,  ["predefined"])} 
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
                      </div>
                    )
                  })

                }
              <GuidelineEdCustom open = {props.open} 
                       handleClose = {props.handleClose} 
                       title={props.title} 
                       userGuideline = {props.userGuideline}
                       code = {props.code}
                       values = {props.values}
                       handleSave = {props.handleSave}
                       handleSetTitle = {props.handleSetTitle}
                       handleSetCodeCustom = {props.handleSetCodeCustom}
                       handleCustomGuidelineEditorDidMount = {props.handleCustomGuidelineEditorDidMount}
                       handleCustomSave = {props.handleCustomSave}
                       />
                
                <p>Custom Guidelines</p>

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
                          onClick={(event) => props.handleClickOpen(event, item.label, item.code, ["custom",item.id])} 
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