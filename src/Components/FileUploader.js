import React, {useState} from 'react';
import styled from 'styled-components';
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const FileUploader = props => {

    const theme = createTheme({
        palette: {
            primary: {
            main: '#1976d2',
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
        if (extension[extension.length - 1] !== props.language){
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
        <span style={{color: "#ffff", marginRight: "10px"}}>
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