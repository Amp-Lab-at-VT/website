import Link from "next/link";

import {Box} from "@mantine/core";

const Footer = () => {
    return (
        <Box
            style={{
                backgroundColor: "#000000",
                borderTop: "1px solid #ddd",
                padding: "20px",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                    <h3
                        className="text-gray-400"
                        style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            marginBottom: "10px",
                        }}
                    >
                        About Us
                    </h3>
                    <p className="text-gray-400">
                        We are a lab committed to getting students active in design.{" "}
                    </p>
                </div>

                <div style={{ flex: 1 }}>
                    <h3
                        style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            marginBottom: "10px",
                        }}
                    >
                        Important Links
                    </h3>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        <li style={{ marginBottom: "5px" }}>
                            <Link
                                className="hover:text-primary-50 text-gray-400"
                                style={{ textDecoration: "none" }}
                                href="/getting_started"
                            >
                                Getting Started
                            </Link>
                        </li>
                        <li style={{ marginBottom: "5px" }}>
                            <Link
                                className="hover:text-primary-50 text-gray-400"
                                style={{ textDecoration: "none" }}
                                href="/Leadership"
                            >
                                Leadership
                            </Link>
                        </li>
                    </ul>
                </div>

                <div style={{ flex: 1 }}>
                    <h3
                        style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            marginBottom: "10px",
                        }}
                    >
                        Location
                    </h3>
                    <p className="text-gray-400">1185 Perry St</p>
                    <p className="text-gray-400">Blacksburg, VA 24060</p>
                    <p className="text-gray-400">Room 236</p>
                </div>
            </div>
        </Box>
    );
};

export default Footer;
