import React from "react";
import styles from "@/comps/Nav/nav.module.css";
import Hamburger from "@/comps/Hamburger/Hamburger.jsx";

export default function Navigation() {
    return (
        <div style={{zIndex : 20000}} className={styles.navbar}>
            <div className={styles.parentNav}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Hamburger />
                </div>
            </div>
        </div>
    );
}
