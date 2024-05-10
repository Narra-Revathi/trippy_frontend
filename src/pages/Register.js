import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const backendURL = "https://trippy-backend-5kp0.onrender.com";


  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendURL}/api/v1/user/register`, {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cVk0zJ5IcMU0MIeJXnCgwcN4t8x5Fausrc8suaUUKf9w9Q4huWXP7EDYx0cG8dxT8c4&usqp=CAU')`, // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        maxWidth={450}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxShadow="10px 10px 20px #ccc"
        borderRadius={5}
        bgcolor="rgba(255, 255, 255, 0.8)" // Add a translucent background to improve readability
        p={3}
      >
        <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 3 }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type="text"
            required
            fullWidth
          />
          <TextField
            placeholder="Email"
            value={inputs.email}
            name="email"
            margin="normal"
            type="email"
            required
            onChange={handleChange}
            fullWidth
          />
          <TextField
            placeholder="Password"
            value={inputs.password}
            name="password"
            margin="normal"
            type="password"
            required
            onChange={handleChange}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, mt: 3 }}
            fullWidth
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, mt: 3, color: "black" }}
            fullWidth
          >
            Already Registered? Login Here
          </Button>

        </form>
      </Box>
    </Box>
  );
};

export default Register;
