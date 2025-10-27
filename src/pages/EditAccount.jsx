import { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EditAccount() {
  const { user, updateUser } = useUser();
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Username cannot be empty!");
      return;
    }

    updateUser({ username, ...(password && { password }) });
    alert("Account details updated successfully!");
    navigate("/");
  };

  return (
    <Box
      component={motion.div}
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 10,
        p: 3,
        backgroundColor: "#E9F1EF",
        borderRadius: 2,
        boxShadow: 3,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Typography variant="h5" color="#3C5556" sx={{ mb: 2 }}>
        Edit Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          inputRef={inputRef}
          label="New Username"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="New Password (optional)"
          fullWidth
          type="password"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          component={motion.button}
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#3C5556",
            color: "#fff",
            py: 1.5,
            "&:hover": { backgroundColor: "#2C4445" },
          }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
}
