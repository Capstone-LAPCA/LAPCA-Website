import React, { useRef, useState } from "react";

import "./../Styles/RightSection.css";
import Guidelines from "./Guidelines";
import Output from "./Output";
import Split from "react-split";
export default function RightSection(props){

    return(
    
        <div className="right-section">
        {/* <Split className = "right-section" direction="vertical" sizes={[60,40]} minSize={[50,50]} style={{height: 'calc(100vh-4)', width: '45%'}}> */}
            <div className="guideline-section">
                <Guidelines handleFormChange={props.handleFormChange}
                open = {props.open}
                title = {props.title}
                guideline = {props.guideline}
                code = {props.code}
                customFormResult = {props.customFormResult}
                handleGuidelineEditorDidMount = {props.handleGuidelineEditorDidMount}
                handleCustomGuidelineEditorDidMount={props.handleCustomGuidelineEditorDidMount}
                handleSetTitle = {props.handleSetTitle}
                handleSetCode = {props.handleSetCode}
                handleSave = {props.handleSave}
                handleClickOpen = {props.handleClickOpen}
                handleDelete = {props.handleDelete}
                handleClose = {props.handleClose}
                getGuidelines = {props.getGuidelines}
                handleCustomSave = {props.handleCustomSave}
                handleCustomClose={props.handleCustomClose}
                handleSetCustomCode={props.handleSetCustomCode}
                handleCustomClickOpen={props.handleCustomClickOpen}
                customOpen={props.customOpen}
                handleCustomFormChange={props.handleCustomFormChange}
                state = {props.state}
                />
            </div>
            <div className="output-section">
                {/* <Output violation={props.violation} isLoading={props.isLoading}/> */}
            </div>
        </div>
        

    );
}


// <div className="right">
        {/*
        // <Split direction= "vertical" style={{height: 'calc(100vh - 4)'}} >
        // <Guidelines handleFormChange={props.handleFormChange}
        // open = {props.open}
        // title = {props.title}
        // guideline = {props.guideline}
        // code = {props.code}
        // customFormResult = {props.customFormResult}
        // handleGuidelineEditorDidMount = {props.handleGuidelineEditorDidMount}
        // handleCustomGuidelineEditorDidMount={props.handleCustomGuidelineEditorDidMount}
        // handleSetTitle = {props.handleSetTitle}
        // handleSetCode = {props.handleSetCode}
        // handleSave = {props.handleSave}
        // handleClickOpen = {props.handleClickOpen}
        // handleDelete = {props.handleDelete}
        // handleClose = {props.handleClose}
        // getGuidelines = {props.getGuidelines}
        // handleCustomSave = {props.handleCustomSave}
        // handleCustomClose={props.handleCustomClose}
        // handleSetCustomCode={props.handleSetCustomCode}
        // handleCustomClickOpen={props.handleCustomClickOpen}
        // customOpen={props.customOpen}
        // handleCustomFormChange={props.handleCustomFormChange}
        // state = {props.state}
        // />
        // <Output violation={props.violation} isLoading={props.isLoading}/>
        // </Split>
        */}