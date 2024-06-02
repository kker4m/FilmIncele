import React from "react";
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";
import TextBox from "./TextBox";
import Cookies from 'js-cookie';

const MoviePage = () => {
  const { id } = useParams();
  const [movieDetails, setDetails] = useState([]);
  const userId = Cookies.get('id'); // Get user_id from cookies

  const saveMovieToLocalDB = async (movie) => {
    const director = movie.production_companies.length > 0 ? movie.production_companies[0].name : "Unknown";
    const cast = movie.production_companies.length > 1 ? movie.production_companies.slice(1).map(company => company.name).join(", ") : "Unknown";

    const movieData = {
      title: movie.original_title,
      releaseYear: new Date(movie.release_date).getFullYear(),
      director: director,
      cast: cast,
      genreName: movie.genres.length > 0 ? movie.genres[0].name : "Unknown",
      description: movie.overview,
      categoryName: "Film" // You might need to determine this based on some logic
    };

    try {
      const response = await fetch('http://localhost:8080/api/movie/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      });
      const data = await response.json();
      console.log("Movie saved:", data);
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  const checkMovieExists = async (title) => {
    try {
      const response = await fetch(`http://localhost:8080/api/movie/title?title=${encodeURIComponent(title)}`);
      if (response.status === 200) {
        return true;
      } else if (response.status === 404) {
        return false;
      }
    } catch (error) {
      console.error("Error checking movie in local DB:", error);
      return false;
    }
  };

  const fetchDetails = async () => {
    fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=0cec67fe43f9191296e8cb82c2303e20&language=tr-TR')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setDetails(data);
      });
  }

  useEffect(() => {
    const checkAndSaveMovie = async () => {
      await fetchDetails();
    };

    checkAndSaveMovie();
  }, [id]); // Remove movieDetails from dependencies

  useEffect(() => {
    const saveMovieIfNew = async () => {
      if (movieDetails && movieDetails.original_title) {
        const exists = await checkMovieExists(movieDetails.original_title);
        if (!exists) {
          saveMovieToLocalDB(movieDetails);
        }
      }
    };

    saveMovieIfNew();
  }, [movieDetails]);

  if (typeof movieDetails.revenue === 'undefined') {
    return <>Loading</>;
  } else {
    var mins = movieDetails.runtime;
    var hrs = parseInt(movieDetails.runtime / 60);
    mins = mins - 60 * hrs;
    return (
      <>
        <Container className='wrapper-box' maxWidth="false">
          <h3 style={{ marginBottom: '3px' }}>{movieDetails.original_title}</h3>
          <hr></hr>
          <Container disableGutters className='movie-detailed-box' maxWidth="false" sx={{ display: 'flex', marginLeft: '1%', width: '100%' }}>
            <Stack spacing={0} style={{ marginBottom: '3px' }}>
              <img src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} alt="movie_img" />
              <h4 style={{ margin: '3px' }}>
                Film Hakkında
              </h4>
              <hr></hr>
              <div>
                <b>Film Süresi: </b>{hrs} saat {mins} dakika
              </div>
              <div>
                <b>Piyasaya Sürülme Tarihi: </b>{movieDetails.release_date}
              </div>
              <div>
                <b>Hasılat: </b>${(movieDetails.revenue).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div>
                <b>Yapımcılar: </b>
                {movieDetails.production_companies.map((producer, index, arr) => (
                  index === arr.length - 1 ? <>{producer.name}</> : <>{producer.name}, </>
                ))}
              </div>
              <div>
                <b>Türler: </b>
                {movieDetails.genres.map((genres, index, arr) => (
                  index === arr.length - 1 ? <>{genres.name}</> : <>{genres.name}, </>
                ))}
              </div>
            </Stack>

            <Stack spacing={0} style={{ marginLeft: '5%' }}>
              <h4 style={{ marginBottom: '3px' }}>
                Özet
              </h4>
              <hr></hr>
              <div className='info'>
                {movieDetails.overview}
              </div>

              <TextBox
                user_id={userId} // Pass user_id to TextBox
                movie_name={movieDetails.original_title}
              />
            </Stack>

          </Container>
        </Container>
      </>
    );
  }
}

export default MoviePage;
