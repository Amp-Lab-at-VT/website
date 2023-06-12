import React from "react";
import styles from '@/comps/Nav/nav.module.css'
import Hamburger from "@/comps/Hamburger/Hamburger.jsx"

export default function Navigation() {

    return (
    <div className={styles.navbar}>
        <div className={styles.parentNav}>
            <div className="flex">
                <Hamburger />
            </div>
        </div>
    </div>
    );
};
