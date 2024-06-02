import Grid from '@mui/material/Grid'
import React from "react";
import { useNavigate } from "react-router-dom";

const Movie = ({movie}) => {
  const navigate = useNavigate();
  const moveToMovie = (id) =>{
    
    navigate("/movies/"+movie.id)
  }
    return (
      
      <Grid item xs={2} className="img-container">
        <div className="img-container" onClick={()=>moveToMovie(movie.id)}>
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt = "movie_img" />
          <div className='img-text'>
            {movie.original_title}
            {/* <div className='img-summary'>{movie.overview}</div> */}
          </div>
        </div>
      </Grid>
    )
}
  
  export default Movie