import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import GuidelinesList from './GuidelineList'
import GuidelineEditor from './GuidelineEditor'

import  "../Styles/RightSection.css"



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  
  export default function Guidelines(props) {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    const theme = createTheme({
      palette: {
          primary: {
          main: '#1976d2',
          },
      },
      });
  

    return (
        <div className="guidelines">
                {/* <h2 >Guidelines</h2> */}
                <Box sx={{marginTop:"0px",borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                        <Tab style={{marginTop:"30px",color:"#b5c0d0",fontWeight:"bold", fontSize:"1.2em"}} label="Guideline List" {...a11yProps(0)} />
                        <Tab style={{marginTop:"30px",color:"#b5c0d0", fontWeight:"bold", fontSize:"1.2em"}} label="Edit" {...a11yProps(1)} />
                    </Tabs>
                </Box>
          
          
                <Box sx={{ width: '100%' }}>
                    <TabPanel value={value} index={0}>
                        <GuidelinesList handleFormChange={props.handleFormChange}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <GuidelineEditor/>
                    </TabPanel>
                </Box>
    
      </div>
    );
  }
  