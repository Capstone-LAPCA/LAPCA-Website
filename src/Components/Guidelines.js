import React, { useEffect, useState } from "react";
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
      state = {props.state}
      />
      </div>
    );
}