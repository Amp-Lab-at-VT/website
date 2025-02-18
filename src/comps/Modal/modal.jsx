import { useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Modal as MUIModal,
  Box,
} from "@mui/material";

const Modal = ({ showModal, setShowModal, title, children }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <MUIModal open={showModal} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          maxHeight: "72vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {title}
        </Typography>
        <Box>{children}</Box>
        <Button
          variant="contained"
          color="error"
          onClick={closeModal}
          sx={{ mt: 3 }}
        >
          Exit
        </Button>
      </Box>
    </MUIModal>
  );
};

export default Modal;
