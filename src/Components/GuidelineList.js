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


export default function GuidelinesList(props){

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
            color: "#b5c0d0"
            }}
        >
            
            <FormGroup sx={{ alignContent: "left"}}>

            {guideline.map(item=>{
                return(
                    <FormControlLabel 
                    control={
                    <Checkbox
                        onChange={props.handleFormChange}
                        sx={{color: 'aliceblue'}}
                        id={item.id}
                    />
                }
                label={item.label}
            />
                )
            })

            }
            </FormGroup>
            

    </Paper>

    );
}