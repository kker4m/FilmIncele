import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState, useEffect} from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const LoginPage = () => {
    const navigate = useNavigate();
    const [data,setData] = useState(null)
    const [userCurrent,setUser] = useState([])
    const moveToSignUp = () =>{
        navigate("/register")
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var user = {};
        user.username = data.get('username')
        user.email = data.get('email')
        user.password = data.get('password')
        loginUser(user)
        setUser(user)
    };
    const loginUser = async (user) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
      fetch('http://localhost:8080/api/authenticate/login',requestOptions)
      .then(response => {
        var reply = response.json()
        return reply
      })
      .then(data => {
        
        setData(data);
        return data;
    })
  }
  useEffect(() => {
    if(data!==null){
      var reply = data
      if(reply.access_token){
        document.cookie = "username="+reply.username+";domain=localhost;path=/;SameSite=Lax"
        document.cookie = "id="+reply.user_id+";domain=localhost;path=/;SameSite=Lax"
        document.cookie = "email="+reply.email+";domain=localhost;path=/;SameSite=Lax"
        document.cookie = "access_token="+reply.access_token+";domain=localhost;path=/;SameSite=Lax"
        console.log(document.cookie)
        setData(null)
        console.log("Login Home")
        navigate("/")
      }else{  
        alert("Error: "+reply.response)
        setData(null)
      }
    }
    // eslint-disable-next-line
  }, [data]);
    return(
        <div className="">
        <Container className="container" component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              inputProps={{
                style: { background: 'white' },
              }}
              margin="normal"
              required
              fullWidth
              variant="filled"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              
            />
            <TextField
              inputProps={{
                style: { background: 'white' },
              }}
              margin="normal"
              required
              fullWidth
              variant="filled"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link onClick={moveToSignUp} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Container>
        </div>
    )
  }
  
  export default LoginPage