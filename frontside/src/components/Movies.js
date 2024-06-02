import Movie from './Movie'
import Grid from '@mui/material/Grid'
import React from "react";
const Movies = ({movies, start,title}) => {
    return (
        <div className='box'>
        <h1 className='listTitle'>{title}</h1>
 
        <Grid className ='grid' container spacing={5} justifyContent="center" direction={"row"}>
        {movies.slice(start,start+5).map((movie, index) => (
          <Movie key={`${index}`} movie={movie}  />
        ))}
        </Grid>
      </div>
    )
  }
  
  export default Movies