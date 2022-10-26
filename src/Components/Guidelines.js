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

export default function Guidelines(props){
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");

    const handleClickOpen = (event, k) => {
      setTitle(k);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const theme = createTheme({
        palette: {
            primary: {
            main: '#1976d2',
            },
        },
        });

    const [guideline, setGuideline] = useState([]);
    
    useEffect(()=>{
        axios
        .get("http://127.0.0.1:3003//getGuidelines")
        .then((res) => {
        let data = res.data;
          setGuideline(data["guidelines"]);
        })
        .catch((err) => {
          console.log("Error",err);
        });
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
          <GuidelineEd open = {open} handleClose = {handleClose} title={title}/>
          <div className="guideline-header">
            <h1>Guidelines</h1>
            <Button variant="contained" 
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

            {guideline.map(item=>{
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
            <Button data-id = {item.id} key={item.id} onClick={(event) => handleClickOpen(event, item.id)} variant="contained" style={{ width: "5%", height: "70%", top: "50%", padding: "5px",transform: "translate(-50%, -50%)", background: "none", border: "1px solid aliceblue", borderRadius: "0.8rem"}}>
              <EditIcon style={{color: 'aliceblue', scale: "70%"}} />
              <b style={{textTransform: "capitalize", paddingRight: "5px"}}>Edit</b>
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