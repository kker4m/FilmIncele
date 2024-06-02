import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';
import { useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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
const MovieListPage = ({user}) => {
    const navigate = useNavigate();
    const [list,setList] = useState([])
    let pathname = useLocation()
    const deleteRating = async (request) => {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request)
        };
        fetch('https://flickerx.herokuapp.com/api/v1/user/rating',requestOptions)
        .then(response => {
          var reply = response.json()
          return reply
        })
        .then(data => {
          if(data.response==="success"){
            getRating(user.id)
          }else{
            alert("An error has occured")
          }
          return data;
      })
    }
    const handleChange = (movieId) => {
        if(user === null){
            navigate("/login")
            return;
        }
        let rating = {}
        rating.email = getCookie("email")
        rating.authToken = getCookie("access_token")
        rating.movie_id=movieId
        deleteRating(rating)
    };
    const getRating = async (id) => {
        fetch('https://flickerx.herokuapp.com/api/v1/user/rating/'+id)
        .then(response => {
          var reply = response.json()
          return reply
        })
        .then(data => {
            setList(data) 
            return data;
      })
    }
    /* eslint-disable */
    useEffect(() => {
        if(user === null){
            return;
        }
        getRating(user.id)
    },[pathname])
    /* eslint-enable */

    return (
        <>
        <TableContainer sx={{
            width:'50%',
            margin:'0 auto',
            marginTop:'1%',
        }}
        component={Paper}
        >
            <Table  aria-label="simple table" sx={{border:'1px solid white',backgroundColor:"black"}}>
                <TableHead>
                <TableRow>
                    <TableCell sx={{color:"white",border:'1px solid white',backgroundColor:"black"}}>Movie Name</TableCell>
                    <TableCell align='left' sx={{color:"white",border:'1px solid white'}}>Rating</TableCell>
                    <TableCell align='right' sx={{color:"white"}}></TableCell>
                </TableRow>
                </TableHead>
                <TableBody sx={{backgroundColor:"black"}}>
                {list.map((row) => (
                    <TableRow
                    key={row.movieId}
                   
                    >
                    <TableCell component="th" align="left" scope="row" sx={{color:"white",border:'1px solid white'}}>
                        {row.movieId}
                    </TableCell>
                    <TableCell align="left" sx={{color:"white",border:'1px solid white'}}>
                        {row.rating===-1 ? (
                            "-"
                        ) : (
                            row.rating
                        )}
                    </TableCell>
                    <TableCell align="center" sx={{color:"white"}}>
                            <Button variant="contained" size="small" color='error' onClick={()=>handleChange(row.movieId)}>Delete</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}
  
  export default MovieListPage