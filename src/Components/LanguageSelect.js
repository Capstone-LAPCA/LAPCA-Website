import React, { useRef, useState } from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function LanguageSelect({setDefaultCodeTemplate},{setLanguage}){
    
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
      const python_default_code = `print("Hello World")`;
      const c_default_code =`#include <stdio.h>\nint main(){\n\tprintf("Hello World");\n\treturn 0;\n}`;
      const java_default_code =`class TestProgram{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World");\n\t}\n}`;
    
      function handleLanguageChange(event) {
        setLanguage(event.target.value);
        switch (event.target.value) {
          case "py":
            setDefaultCodeTemplate(python_default_code);
            break;
          case "c":
            setDefaultCodeTemplate(c_default_code);
            break;
          case "java":
            setDefaultCodeTemplate(java_default_code);
            break;
          default:
            setDefaultCodeTemplate(python_default_code);
        }
      }
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
              label="Language"
              value="py"
              onChange={handleLanguageChange}

            >
              <MenuItem value={"c"}>C</MenuItem>
              <MenuItem value={"py"}>Python</MenuItem>
              <MenuItem value={"java"}>Java</MenuItem>
            </Select>
            </ThemeProvider>
          </FormControl>
    );
}