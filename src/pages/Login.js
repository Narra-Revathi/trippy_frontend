import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const backendURL = "https://trippy-backend-5kp0.onrender.com";


  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendURL}/api/v1/user/login`, {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login Successful");
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cVk0zJ5IcMU0MIeJXnCgwcN4t8x5Fausrc8suaUUKf9w9Q4huWXP7EDYx0cG8dxT8c4&usqp=CAU')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        maxWidth={450}
        width="100%"
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
        bgcolor="rgba(255, 255, 255, 0.8)"
      >
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase", textAlign: "center" }}
            mb={3}
          >
            Login
          </Typography>

          <TextField
            placeholder="Email"
            value={inputs.email}
            name="email"
            margin="normal"
            type="email"
            required
            fullWidth
            onChange={handleChange}
          />
          <TextField
            placeholder="Password"
            value={inputs.password}
            name="password"
            margin="normal"
            type="password"
            required
            fullWidth
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            fullWidth
            sx={{ mt: 1, color: "black" }}
          >
            Not a user? Register Here
          </Button>

        </form>
      </Box>
    </Box>
  );
};

export default Login;
