import React, { useRef, useState } from "react";


import RightSection from "./Components/RightSection";
import LeftSection from "./Components/LeftSection";

import "./App.css";
import "./scrollbar.css"





import Editor from "@monaco-editor/react";

import axios from "axios";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize } from "@mui/system";
import { RampRight } from "@mui/icons-material";

function App() {
  return(
    <div className="main-body">
      <LeftSection/>
      <RightSection/>
    </div>
  );

}

export default App;
