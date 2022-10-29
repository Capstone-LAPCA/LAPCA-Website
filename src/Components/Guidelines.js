import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import '../Styles/RightSection.css';
import { ConstructionOutlined } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import GuidelineEd from "./GuidelineEd";
import DeleteIcon from '@mui/icons-material/Delete';
import GuidelineEdCustom from "./GuidelineEdCustom"

import PredefinedGuidelines from "./PredefinedGuidelines";
import CustomGuidelines from "./CustomGuidelines";

export default function Guidelines(props){
    return(
      <div>
      <PredefinedGuidelines
      handleFormChange={props.handleFormChange}
      getGuidelines={props.getGuidelines}
      guideline={props.guideline}
      handleGuidelineEditorDidMount = {props.handleGuidelineEditorDidMount}
      open = {props.open}
      title = {props.title}
      code = {props.code}
      handleSetTitle = {props.handleSetTitle}
      handleSetCode = {props.handleSetCode}
      
      handleClickOpen = {props.handleClickOpen}
      handleClose = {props.handleClose}
      handleSave = {props.handleSave}
      
      
      />
      <CustomGuidelines
      customFormResult={props.customFormResult}
      handleCustomClickOpen = {props.handleCustomClickOpen}
      handleCustomGuidelineEditorDidMount={props.handleCustomGuidelineEditorDidMount}
      customOpen={props.customOpen}
      title = {props.title}
      code = {props.code}
      handleSetTitle = {props.handleSetTitle}
      handleSetCustomCode = {props.handleSetCustomCode}
      handleCustomSave = {props.handleCustomSave}
      handleDelete={props.handleDelete}
      handleCustomClose={props.handleCustomClose}
      handleCustomFormChange={props.handleCustomFormChange}
      />
      </div>
    );
}