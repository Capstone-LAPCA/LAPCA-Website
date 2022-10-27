import React, { useRef, useState } from "react";

import "./../Styles/RightSection.css";
import Guidelines from "./Guidelines";
import Output from "./Output";

export default function RightSection(props){

    return(
    <div className="right-section">
        <Guidelines handleFormChange={props.handleFormChange}
        open = {props.open}
        title = {props.title}
        guideline = {props.guideline}
        code = {props.code}
        userGuideline = {props.userGuideline}
        handleGuidelineEditorDidMount = {props.handleGuidelineEditorDidMount}
        handleSetTitle = {props.handleSetTitle}
        handleSetCode = {props.handleSetCode}
        handleSave = {props.handleSave}
        handleClickOpen = {props.handleClickOpen}
        handleDelete = {props.handleDelete}
        handleClose = {props.handleClose}
        getGuidelines = {props.getGuidelines}
        handleCustomSave = {props.handleCustomSave}/>
        <Output violation={props.violation} isLoading={props.isLoading}/>
    </div>
    );
}