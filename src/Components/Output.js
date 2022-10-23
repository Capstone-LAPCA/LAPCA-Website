import React from "react";
import Paper from "@mui/material/Paper";
import "./../Styles/RightSection.css"

export default function Output(props){
    return(
    <Paper
        elevation={8}
        sx={{
          m: "3px",
          marginBottom: "0px",
          minHeight: "290px",
          padding: "20px",
          paddingTop: "2px",
          background: "#050c1b",
          color: "rgb(255,255,255)",
          resize: "both"
        }}
      >
        
        <h2 style={{ textAlign: "left" }}>Output</h2>
        <div style={{ whiteSpace:"pre-line", backgroundColor: "#111827", minHeight: "300px", padding: "10px",
      fontSize: "18px"}}>
        <p >{props.violation}</p>
        </div>
      </Paper> 
    );
}