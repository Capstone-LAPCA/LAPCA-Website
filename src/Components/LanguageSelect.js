import React, { useRef, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import '../Styles/LeftSection.css'

export default function LanguageSelect(props){
    
    const themeDark = createTheme({
        palette: {
          background: {
            paper: "#050c1b",
          },
          text: {
            primary: "white"
          }
        }
      });


    return(
        <FormControl
            sx={{
              marginBottom: "10px",
              marginTop: "20px",
              minHeight: 10,
              minWidth: 80,
              background: '#1d2432'
            }}
          >
        <ThemeProvider theme={themeDark}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={props.language}
              value={props.language}
              onChange={props.handleLanguageChange}

            >
              <MenuItem value={"c"}>C</MenuItem>
              <MenuItem value={"py"}>Python</MenuItem>
              <MenuItem value={"java"}>Java</MenuItem>
            </Select>
            </ThemeProvider>
          </FormControl>
    );
}