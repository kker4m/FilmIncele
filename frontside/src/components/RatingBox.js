import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {  useEffect } from 'react'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
/* eslint-disable */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
/* eslint-enable */

const RatingBox = ({user,id,movie_name}) => {
    const [rating, setRating] = React.useState(-1);
    const [disabledSelect, setDisabled] = React.useState(true);
    const [buttonText, setText] = React.useState('Add');
    const [buttonColor, setColor] = React.useState('primary');
    const navigate = useNavigate();
    const addRating = async (user) => {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        };
        fetch('https://flickerx.herokuapp.com/api/v1/user/rating',requestOptions)
        .then(response => {
          var reply = response.json()
          return reply
        })
        .then(data => {
          if(data.response==="success"){
            setDisabled(false)
            setRating(user.rating)
            setText("DELETE")
            setColor('error')
          }else{
            alert("An error has occured")
          }
          return data;
      })
    }
    const getRating = async (id) => {
        fetch('https://flickerx.herokuapp.com/api/v1/user/rating/'+id)
        .then(response => {
          var reply = response.json()
          return reply
        })
        .then(data => {
            var result = data.filter(function (el){
            return el.movieId === movie_name
          })
          if(result.length !== 0){
            var ratingEntry = result[0];
            setDisabled(false);
            setRating(ratingEntry.rating)
            setText("DELETE")
            setColor('error')
          }
          return data;
      })
    }
    const deleteRating = async (user) => {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        };
        fetch('https://flickerx.herokuapp.com/api/v1/user/rating',requestOptions)
        .then(response => {
          var reply = response.json()
          return reply
        })
        .then(data => {
          if(data.response==="success"){
            setDisabled(true)
            setRating(-1)
            setText("ADD")
            setColor('primary')
          }else{
            alert("An error has occured")
          }
          return data;
      })
    }
    const handleChange = (event) => {
        if(user.user == null){
            navigate("/login")
            return;
        }
        let rating = {}
        rating.email = getCookie("email")
        rating.authToken = getCookie("access_token")
        rating.movie_id=movie_name
        rating.rating = event.target.value
        addRating(rating)
    };

    const toggleInput = (event) => {
        if(user.user == null){
            navigate("/login")
            return;
        }
        var innerText = event.target.innerText
        let rating = {}
        rating.email = getCookie("email")
        rating.authToken = getCookie("access_token")
        rating.movie_id=movie_name
        if(innerText==="DELETE"){
            deleteRating(rating)
        }else{ //Default Add
            rating.rating = -1
            addRating(rating)
        }
        
    };
    /* eslint-disable */

    useEffect(() => {
        if(user.user === null){
            setRating(-1)
            setText('Add')
            setColor('primary')
            return;
        }
        //Retrieve rating from REST
        setRating(-1)
        setText('Add')
        setColor('primary')
        getRating(user.user.id)
    },[id,user,movie_name])
    /* eslint-enable */

    return (
        <Box
        sx={{
            width: 300,
            height: 60,
            backgroundColor: '#242323',
            borderRadius: '16px',
            marginTop:"10%",
            verticalAlign: "middle"
        }}
        >
            <Stack direction="row" spacing={2} sx={{top:"50%",position: "relative", marginLeft:"4%", transform:"translateY(-50%)"}}>
                <Button variant="contained" size="small" color={buttonColor} onClick={toggleInput}>{buttonText}</Button>
                <Select
                    id="rating"
                    value={rating}
                    size="small"
                    sx={{backgroundColor:'white',color:'black'}}
                    onChange={handleChange}
                    disabled={disabledSelect}
                    >
                    <MenuItem value={-1}>Select</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </Stack>
        </Box>
    )
}
  
  export default RatingBox