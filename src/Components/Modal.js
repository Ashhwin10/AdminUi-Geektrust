import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function ModalComponent({
  usersData,
  showModal,
  CloseModal,
  SetUserData,
  selectedUser
}) {
  // States to update the Name ,Email ,Role.
  const [name, setName] = useState(usersData.name);
  const [email, setEmail] = useState(usersData.email);
  const [role, setRole] = useState(usersData.role);

  //submit handling function
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = usersData.map((item) => {
      if (item.id === selectedUser) {
        return { ...item, name, email, role };
      }
      return item;
    });
    SetUserData(updatedList);
    CloseModal();
  };

  return (
    <Modal
      open={showModal}
      onClose={CloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="role"
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
