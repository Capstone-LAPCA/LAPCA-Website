import React, { useRef, useState } from "react";

import "./../Styles/RightSection.css";
import Guidelines from "./Guidelines";
import Output from "./Output";

export default function RightSection(props){

    return(
    <div className="right-section">
        <Guidelines handleFormChange={props.handleFormChange}/>
        <Output violation={props.violation} isLoading={props.isLoading}/>
    </div>
    );
}