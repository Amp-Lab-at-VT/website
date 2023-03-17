import React from 'react'
import styles from './burger.module.css'
import Link from 'next/link'

import {AiOutlineMenu} from 'react-icons/ai'

export default function Hamburger() {
  return (
    <div className={styles.dropdown}>
      
      <button className={styles.dropbtn}> 
        <AiOutlineMenu className = {styles.dropdownIcon}></AiOutlineMenu>
      </button>
      <div className = {styles.dropdownContent}>
        <Link href="/">Home</Link>
        <Link href="/getting_started">Getting Started</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
        <Link href="/useful_as">Useful Links</Link>
        <Link href="/soldering">Soldering</Link>
        {/* <Link to="/about">About</Link> */}
      </div>
    </div>
  )
}


