import React from "react";

import styles from "@/comps/LeadershipBox/leadership.module.css";

import Image from "next/image";


export default function LeadershipBox({src, name, title, email} : LeadershipBoxProps) {
    if (!src)
        return null;

    return (
        <div  className={styles.leadershipBox}>
            <div className={styles.alignImage}>
                <Image src={src} alt={name + "Image"} width={100} height={100}></Image>
            </div>
            <p>
                <em>{title}</em>
            </p>
            <p>
                <a href={"mailto:" + email}>{email}</a>
            </p>
        </div>
    );
}

type LeadershipBoxProps = {
    src: string,
    name: string,
    title: string,
    email: string
}
