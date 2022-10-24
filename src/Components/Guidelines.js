import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import '../Styles/RightSection.css';


export default function Guidelines(props){
    const [guideline, setGuideline] = useState([]);
    
    useEffect(()=>{
        axios
        .get("http://127.0.0.1:3003//getGuidelines")
        .then((res) => {
          console.log("res", res.data);
          let data = res.data;
          console.log("data", data);
          setGuideline(data);
          console.log(guideline);
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

            {/* {data.map(item=>{
                return(
                    <FormControlLabel
                    control={
                    <Checkbox
                        onChange={props.handleFormChange}
                        sx={{color: 'aliceblue'}}
                        id={item.name}
                    />
                }
                label="Check if recursion is used"
            />
                )
            })

            } */}

            <FormControlLabel
                control={
                <Checkbox
                    onChange={props.handleFormChange}
                    sx={{color: 'aliceblue'}}
                    id="Recursion.lapx"
                />
                }
                label="Check if recursion is used"
            />
            <FormControlLabel
                control={
                <Checkbox
                    id="var_greater_than_31.lapx"
                    sx={{color: 'aliceblue'}}
                    onChange={props.handleFormChange}
                />
                }
                label="Check if variable name exceeds 31 characters"
            />
            <FormControlLabel
                control={
                <Checkbox
                    id="Dead_Code.lapx"
                    sx={{color: 'aliceblue'}}
                    onChange={props.handleFormChange}
                />
                }
                label="Check for dead code"
            />
            <FormControlLabel
                control={
                <Checkbox
                    id="Assign_in_loop.lapx"
                    sx={{color: 'aliceblue'}}
                    onChange={props.handleFormChange}
                />
                }
                label="Check for assignment in loop"
            />
            <FormControlLabel
                control={
                <Checkbox
                    id="Binary_Search_Iterative.lapx"
                    sx={{color: 'aliceblue'}}
                    onChange={props.handleFormChange}
                />
                }
                label="Check if binary search iterative is implemented"
            />
            <FormControlLabel
                control={
                <Checkbox
                    id="Continue.lapx"
                    sx={{color: 'aliceblue'}}
                    onChange={props.handleFormChange}
                />
                }
                label="Check if continue statement is used"
            />
            <FormControlLabel
                control={
                <Checkbox
                    id="Unused_Functions.lapx"
                    sx={{color: 'aliceblue'}}
                    onChange={props.handleFormChange}
                />
                }
                label="Check for any unused functions"
            />
            <FormControlLabel
                control={
                <Checkbox
                    id="One_var_decl.lapx"
                    sx={{color: 'aliceblue'}}
                    onChange={props.handleFormChange}
                />
                }
                label="One variable declaration per line"
            />
            </FormGroup>
    </Paper>

    );
}