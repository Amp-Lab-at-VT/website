import { useState } from "react";
import { Paper, Button, Typography, Box } from "@mui/material";
import Modal from "@/comps/Modal/modal.jsx";

const CustomBox = ({ icon, title, buttonTitle, color, href, children }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleRedirect = () => {
    window.location.href = href;
  };

  return (
    <Paper
      sx={{
        border: "1px solid #ccc",
        borderRadius: 1,
        p: 2,
        // backgroundColor: color,
        width: "15vw",
        minWidth: 200,
        m: 1,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h2" color="primary" gutterBottom>
          {icon}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={href ? handleRedirect : openModal}
        sx={{ width: "100%" }}
      >
        {buttonTitle}
      </Button>
      <Modal title={title} showModal={showModal} setShowModal={setShowModal}>
        {children}
      </Modal>
    </Paper>
  );
};

CustomBox.defaultProps = {
  href: null,
};

export default CustomBox;
