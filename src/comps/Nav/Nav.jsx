import React from "react";
import styles from '@/comps/Nav/nav.module.css'
import Hamburger from "@/comps/Hamburger/Hamburger.jsx"
import { useTheme } from 'next-themes'

export default function Navigation() {
    const { theme, setTheme } = useTheme()

    return (
        <div className={styles.navbar}>
            <div className={styles.parentNav}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Hamburger />
                    <button className="px-4 py-2 text-white dark:text-black bg-black dark:bg-white font-semibold rounded-md"
                        onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light') }}> Change Theme
                    </button>
                </div>
            </div>
        </div>
    );
};
