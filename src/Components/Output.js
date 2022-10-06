import Paper from "@mui/material/Paper";
import React, { useState } from "react";


export default function OutputComponent(){
    const [violation,setViolation]=useState()
    return (
        <Paper
                elevation={8}
                sx={{
                  m: "3px",
                  marginBottom: "0px",
                  minHeight: "150px",
                  padding: "20px",
                  paddingTop: "1px",
                  
                }}
              >
                <h2 style={{ textAlign: "left" }}>Output</h2>
                <div style={{ whiteSpace:"pre-line" }}>
                <p >{violation}</p>
                </div>
              </Paper>
    )
}