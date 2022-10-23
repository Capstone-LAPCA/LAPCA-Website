import React from "react";

import "./../Styles/RightSection.css";
import Guidelines from "./Guidelines";
import Output from "./Output";

export default function RightSection(){
    return(
    <div className="right-section">
        <Guidelines/>
        <Output/>
    </div>
    );
}