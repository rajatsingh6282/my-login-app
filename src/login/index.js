import React, { useState, useEffect } from 'react'; // Import useState
import { Button, TextField, Box, Typography } from '@mui/material';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () =>{
        if(email != '' && password !=''){
            callTokenApi();
        }
    }

    const onLogout = () =>{
        localStorage.removeItem('token');
        console.log("removed token....");
    }

    const callTokenApi = async () =>{
        const url = process.env.REACT_APP_API+'auth/login';
        const parameters = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', // Set the headers appropriately
            },
            body: JSON.stringify({ // Use the state values here
                email: email,
                password: password
            }),
        };
        try {
            const response = await fetch(url, parameters);
            const data = await response.json();
            if(data?.jwtToken != ''){
                localStorage.setItem('token',data?.jwtToken);
            }
           // console.log(data); 
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    return ( 
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center" // Fix typo here
        alignItems="center"
        minHeight="100vh"
    >
        <Typography variant="h4" component="h1" gutterBottom>
        Login
        </Typography>
        <Button 
            variant="contained" 
            color="secondary" 
            onClick={onLogout}>
            Logout
        </Button>
        <form onSubmit={(e) => { 
            e.preventDefault(); // Prevent default form submission
            callTokenApi(); // Call your API on form submit
        }}>
        <Box mb={2}>
            <TextField
            label="Username"
            type="text"
            value={email} // Bind value
            onChange={(e) => setEmail(e.target.value)} // Set onChange
            fullWidth
            required
            />
        </Box>
        <Box mb={2}>
            <TextField
            label="Password"
            type="password"
            value={password} // Bind value
            onChange={(e) => setPassword(e.target.value)} // Set onChange
            fullWidth
            required
            />
        </Box>
        <Button variant="contained" color="primary" type="submit" onClick={handleClick}>
            Login
        </Button>
        </form>
    </Box>
    );
};

export default LoginForm;
