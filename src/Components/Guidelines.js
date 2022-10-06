import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";

export default function GuidelinesComponent(){
    const [formResult, setFormResult] = useState({
        "Recursion.lapx": false,
        "Assign_in_loop.lapx": false,
        "Continue.lapx": false,
        "Unused_Functions.lapx": false,
        "One_var_decl.lapx": false,
        "Binary_Search_Iterative.lapx": false,
        "Dead_Code.lapx": false,
        "var_greater_than_31.lapx": false,
      });
    
    function handleFormChange(event) {
        let newFormResult = formResult;
        newFormResult[event.target.id] = event.target.checked;
        setFormResult(newFormResult);
        console.log(formResult);
      }
    return (
        <Paper
                elevation={8}
                sx={{
                  textAlign: "left",
                  m: "3px",
                  marginTop: "0px",
                  padding: "20px",
                  paddingTop: "2px",
                  boxShadow: "none",
                }}
              >
                <h2>Guidelines</h2>
                <FormGroup sx={{ alignContent: "left" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleFormChange}
                        id="Recursion.lapx"
                      />
                    }
                    label="Check if recursion is used"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="var_greater_than_31.lapx"
                        onChange={handleFormChange}
                      />
                    }
                    label="Check if variable name exceeds 31 characters"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Dead_Code.lapx"
                        onChange={handleFormChange}
                      />
                    }
                    label="Check for dead code"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Assign_in_loop.lapx"
                        onChange={handleFormChange}
                      />
                    }
                    label="Check for assignment in loop"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Binary_Search_Iterative.lapx"
                        onChange={handleFormChange}
                      />
                    }
                    label="Check if binary search iterative is implemented"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Continue.lapx"
                        onChange={handleFormChange}
                      />
                    }
                    label="Check if continue statement is used"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Unused_Functions.lapx"
                        onChange={handleFormChange}
                      />
                    }
                    label="Check for any unused functions"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="One_var_decl.lapx"
                        onChange={handleFormChange}
                      />
                    }
                    label="One variable declaration per line"
                  />
                </FormGroup>
              </Paper>
    )
}