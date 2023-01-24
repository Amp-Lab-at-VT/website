import React from "react";
import './nav.css'


import Hamburger from "../Hamburger/Hamburger.jsx"

export default function Navigation({fileContents}) {

    return (
    <div class="navbar">
        <div class="parentNav">
            <div style={{display : "flex", alignItems: "center"}}>
                <Hamburger fileContents = {fileContents}></Hamburger>
            </div>
            <div style={{display : "flex", alignItems: "center"}}>
            </div>
        </div>
    </div>
    );
};
