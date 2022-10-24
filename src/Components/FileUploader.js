import React, {useState} from 'react';
import styled from 'styled-components';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ConstructionRounded } from '@mui/icons-material';


const FileUploader = props => {

    const theme = createTheme({
        palette: {
            primary: {
            // This is green.A700 as hex.
            main: '#0096FF',
            },
        },
        });
    
  const [fileName, setFileName] = useState("");

  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    let name = fileUploaded.name;
    var fr=new FileReader();
    fr.readAsText(fileUploaded);
    fr.onload = () => {
        let extension = name.split(".");
        if (extension[extension.length - 1] != props.language){
            alert("Code does not match the language selected. Please upload a different file")
            return;
        }
        props.setDefaultCodeTemplate(fr.result);
        setFileName(name);
    }
  };

  
  return (
    <>
    <ThemeProvider theme={theme}>
        <span style={{color: "#ffff", marginRight: "20px"}}>
            {fileName}
        </span>
      <Button onClick={handleClick} variant="contained" style={{marginRight: "20px"}}>
        Upload Code
      </Button>
    </ThemeProvider>

      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
    </>
  );
};

export default FileUploader;