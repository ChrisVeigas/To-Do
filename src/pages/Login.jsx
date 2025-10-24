import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Box
      component={motion.div}
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: 10,
        p: 3,
        backgroundColor: "#E9F1EF",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#3C5556", mb: 2 }}
      >
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#3C5556",
            "&:hover": { backgroundColor: "#2C4445" },
            mt: 2,
          }}
        >
          Login
        </Button>

        <p className="text-sm text-gray-600 p-1">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-700 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </Box>
  );
}

export default Login;
