import React from "react";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";



export default function Guidelines(props){
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