import styles from "./iconAndName.module.css";
import Modal from "@/comps/Modal/modal.jsx";
import { useRouter } from "next/router";

import React, { useState } from "react";

const Box : React.FC<BoxProps> = ({ icon, title, buttonTitle, color, href=null, children }) => {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const openModal = () => {
        setShowModal((prev) => !prev);
    };

    return (
        <div>
            <div
                className={styles.pop_in}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "10px",
                    backgroundColor: color,
                    width: "15vw",
                    minWidth: "200px",
                    margin: "10px",
                    height: "200px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                    }}
                >
                    <div className="flex justify-center flex-col ">
                        <div
                            className="text-primary-50 flex justify-center"
                            style={{ fontSize: "80px", marginBottom: "5px" }}
                        >
                            {icon}
                        </div>
                        <h3
                            className="text-center"
                            style={{ fontWeight: "bold", marginBottom: "10px" }}
                        >
                            {title}
                        </h3>
                    </div>
                    {href != null ? (
                        <button
                            className="bg-primary-50 text-white  border-0  rounded-md  px-5 py-2  transition duration-300 ease-in-out hover:bg-gray-500 p-2"
                            onClick={() => router.push(href)}
                        >
                            {buttonTitle}
                        </button>
                    ) : (
                        <button
                            className="bg-primary-50 text-white  border-0  rounded-md  px-5 py-2transition duration-300 ease-in-out hover:bg-gray-500 p-2"
                            onClick={openModal}
                        >
                            {buttonTitle}
                        </button>
                    )}
                </div>
            </div>
            {showModal ? (
                <Modal title={title} showModal={showModal} setShowModal={setShowModal}>
                    {children}
                </Modal>
            ) : null}
        </div>
    );
};
export default Box;

type BoxProps = {
    icon: JSX.Element;
    title: string;
    buttonTitle: string;
    color: string;
    href ?: string | null;
    children ?: React.ReactNode;
};
