import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import '../Styles/LapcaScore.css';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import axios from 'axios';

export default function LapcaScore(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [reportType, setReportType] = useState("score");

    const handleSubmit=() => {
        // console.log(name);
        // console.log(email);
        // console.log(reportType);
        // console.log(uploadFile);
        axios.post("http://127.0.0.1:3003//upload_file", 
        {name: name,
         email: email,
         reportType: reportType,
         uploadFile: uploadFile})
        .then((res) => {
            console.log(res);
        })
    };

  const handleReportType = (event) =>{
    switch(event.target.value){
        case 'score': setReportType('score');
                      break;
        case 'similarity': setReportType('similarity');
                           break;
        default: setReportType('score');
    }
  };

  const [fileName, setFileName] = useState("");
  const [uploadFile, setUploadFile] = useState("");
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    let name = fileUploaded.name;
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      setFileName(name);
      setUploadFile({data:reader.result.split(',').pop(),fileName:event.target.files[0].name})
    };
  };

  const theme1 = createTheme({
    palette: {
        primary: {
        main: '#1976d2',
        },
    },
    });

    const theme2 = createTheme({
        palette: {
            primary: {
            main: '#11cb5f',
            },
        },
        });

    return(
        <div className="main-score-div">
            <div className='score-heading'>
                <h1>Submit your project, we'll email your code report!</h1>
            </div>
            <Box sx={{typography: 'body1',minWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FormControl sx={{minWidth: '30%', backgroundColor:'#111827',padding:'30px', borderRadius:'1rem', border: "1px solid aliceblue"}}>
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{color: '#b5c0d0'}}>Report Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{color:'#b5c0d0'}}
                                onChange={(event) => handleReportType(event)}
                            >
                                <FormControlLabel value="score" control={<Radio />} label="LAPCA Score" />
                                <FormControlLabel value="similarity" control={<Radio />} label="Similarity Score" />
                            </RadioGroup>
                    <label>Name</label>
                        <BootstrapInput fullWidth
                            sx={{ input: { color: '#b5c0d0'}}} 
                            type="text"
                            id="bootstrap-input"
                            onChange = {(event) => setName(event.target.value)} />
                        <label>Email</label>
                        <BootstrapInput fullWidth
                            sx={{ input: { color: '#b5c0d0'}}} 
                            type="email"
                            id="bootstrap-input" 
                            onChange = {(event) => setEmail(event.target.value)}/>
                        
                            
                            <ThemeProvider theme={theme1} style={{marginTop: "20px"}}>
                                Select a Folder
                                <span>
                                <Button variant="contained" onClick={handleClick} style={{marginRight: "20px"}}>
                                    <b>Upload Code</b>
                                </Button>
                                <span style={{color: "#ffff", marginRight: "10px"}}>
                                    {fileName}
                                </span>
                                </span>
                            </ThemeProvider>

                            <input type="file"
                                    ref={hiddenFileInput}
                                    onChange={handleChange}
                                    style={{display:'none'}} 
                                    accept=".zip,.rar,.7zip"
                            /> 
                            <br/>
                        <ThemeProvider theme={theme2}>
                            <Button variant="contained" onClick={handleSubmit} color="primary">
                                <b>Submit Code</b>
                            </Button>
                        </ThemeProvider>

                        </FormControl>
                    </Box>
        </div>
    )
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor:  '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      maxWidth: 'auto',
      padding: '10px 12px',
      color: 'white',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));