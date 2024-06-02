import Button from '@mui/material/Button';
import React from "react";
import { useNavigate } from "react-router-dom";
import AccountMenu from './AccountMenu';

const LoginButton = ({user}) => {
    const navigate = useNavigate();
    const moveToLoginPage = () =>{
        navigate("/login")
    }
    if(user.user == null){
        return (
            <Button size="large" sx={{color: 'white'}} onClick={moveToLoginPage}>Login/Register</Button>
        )
    }
    return(<AccountMenu user={user}/>)
  }
  
  export default LoginButton