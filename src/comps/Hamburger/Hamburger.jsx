import React from "react";
import styles from "@/comps/Hamburger/burger.module.css";
import Link from "next/link";

import { AiOutlineMenu } from "react-icons/ai";

export default function Hamburger() {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        <AiOutlineMenu className={styles.dropdownIcon}></AiOutlineMenu>
      </button>
      <div className={styles.dropdownContent}>
        <Link href="/">Home</Link>
        <Link href="/getting_started">Getting Started</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
        <Link href="/resources">Resources</Link>
        {/* <Link href="/useful_links">Useless Links</Link> */}
      </div>
    </div>
  );
}
