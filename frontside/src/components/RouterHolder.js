import MoviePage from './MoviePage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import MovieListPage from './MovieListPage.js'
import Movies from './Movies'
import Header from './Header'
import { Route, Routes,useParams} from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router';
import React from "react";
import { useState, useEffect} from 'react'
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

const RouterHolder = () => {
  const [topMovies, setTopMovie] = useState([])
  const [upcomingMovies, setUpcoming] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)
  let { id } = useParams();
  let pathname = useLocation()
  const navigate = useNavigate();
  useEffect(() => {
    fetchPopular()
    fetchUpcoming()
  }, [])
  /* eslint-disable */

  useEffect(() => {
    let username = getCookie("username");
    if(username!=""){
        let user = {}
        user.email = getCookie("email")
        user.token = getCookie("access_token")
        console.log(user)
        verifyToken(user)
    }else if(loggedInUser!==null){
        setLoggedInUser(null)
        console.log("RouterHolder LoggedInUser == null")
        navigate("/")
    }
    console.log(pathname.pathname);
  },[pathname])
  /* eslint-enable */

  
  const fetchPopular = async () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=0cec67fe43f9191296e8cb82c2303e20&language=tr-TR')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTopMovie(data.results)
      })
  }
  const fetchUpcoming = async () => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=0cec67fe43f9191296e8cb82c2303e20&language=tr-TR')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUpcoming(data.results)
      })
  }
  const verifyToken = async (user) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      mode:"cors"
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/authenticate/check_token', requestOptions);
  
      if (response.status === 200) {
        const data = await response.json();
        if (data.response === "authenticated") {
          handleAuthenticated();
        } else {
          handleUnauthenticated();
        }
      } else if (response.status === 401) {
        const data = await response.json();
        console.log(data.response); // "unauthorized"
        handleUnauthenticated();
      } else if (response.status === 404) {
        console.log('Token verification endpoint not found');
        handleUnauthenticated();
      } else {
        console.log(`Unexpected response status: ${response.status}`);
        handleUnauthenticated();
      }
    } catch (error) {
      console.error('Error:', error);
      handleUnauthenticated();
    }
  };
  
  const handleUnauthenticated = () => {
    setLoggedInUser(null);
    var cookies = document.cookie.split("; ");
    /* eslint-disable */
    for (var c = 0; c < cookies.length; c++) {
      var d = window.location.hostname.split(".");
      while (d.length > 0) {
        var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
        var p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
          document.cookie = cookieBase + p.join('/');
          p.pop();
        }
        d.shift();
      }
    }
    /* eslint-enable */
    console.log("RouterHolder Response is not authenticated Home");
    navigate("/");
  };
  
  const handleAuthenticated = () => {
    let userCurrent = {};
    userCurrent.email = getCookie("email");
    userCurrent.id = getCookie("id");
    userCurrent.authToken = getCookie("access_token");
    userCurrent.username = getCookie("username");
    setLoggedInUser(userCurrent);
  };
  
    return (
        <div className='container'>
      <Header user={loggedInUser}></Header>
        <Routes>
          <Route
            path='/'
            element={
              <>
              
              <div>
              <Movies movies={topMovies}
              start={0} title={"Popular"}
              />
              </div>
              <div>
              <Movies movies={upcomingMovies}
              start={0} title={"Upcoming"}
              />
              </div>
              </>
            }
          />
          <Route
            path='/movies/:id'
            element={
              <>
              <MoviePage ida={{id}} user={loggedInUser}/>
              </>
            }
            
            // children={<Child />}
          />
          <Route
            path='/login'
            element={
              <>
              <LoginPage/>
              </>
            }
          />
          <Route
            path='/register'
            element={
              <>
              <RegisterPage/>
              </>
            }
          />
          <Route
            path='/list'
            element={
              <>
              <MovieListPage user={loggedInUser}/>
              </>
            }
          />
        </Routes>
        
      </div>
    )
  }
  
  export default RouterHolder