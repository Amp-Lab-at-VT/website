"use client"

import React, { useState } from 'react';
import DocViewer from "react-doc-viewer";
import { Container, Typography, Box, Button, Card, Fade, Stack } from "@mui/material";

export default function Doc(props) {

    const docs = [
        { uri: "https://www.bhphotovideo.com/lit_files/116441.pdf" },
      ];


    return (
        <Container>
            <DocViewer documents={docs} />
        </Container>
    );
}
