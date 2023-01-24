import React from 'react'
import { Link } from "react-router-dom";
import './burger.css'

import {AiOutlineMenu} from 'react-icons/ai'

export default function Hamburger() {
  return (
    <div class="dropdown">
      
      <button class="dropbtn"> 
        <AiOutlineMenu class = "dropdownIcon"></AiOutlineMenu>
      </button>
      <div class="dropdown-content">
        <Link to="/">Home</Link>
        <Link to="/Projects">Projets</Link>
        {/* <Link to="/about">About</Link> */}
      </div>
    </div>
  )
}


