import * as React from 'react';
import { useState} from 'react'
import { Autocomplete } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import LoginButton from './LoginButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      color:'white',
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    height:'90%',
    color:'white',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));
const StyledTextField = styled(TextField)({
  "& label, & label.Mui-focused": {
    color: "white"
  },
});
const StyledAutocomplete = styled(Autocomplete)({
  color:'white',
  width:'300',
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
    width:300,
  },
  ".MuiAutocomplete-root":{
    color:"white",
    backgroundColor:"white"
  },
  ".MuiAutocomplete-paper":{
    border:'1px solid red',

    color:"white"
  },
  ".css-q0fu5":{
    color:"white"
  }
});

const Header = (user) => {
    
    const [searchResult, setResult] = useState([]) 
    const fetchSearch = async (e,value) => {
        e.preventDefault()
        fetch('https://api.themoviedb.org/3/search/movie?api_key=0cec67fe43f9191296e8cb82c2303e20&language=tr-TR&page=1&include_adult=false&query='+e.target.value)
        .then(response => {
        return response.json()
        })
        .then(data => {
          if(data.results === undefined){
            setResult([])
          }else{
            setResult((data.results))
          }
        })
    } //still gotta use autocomplete spend some time figuring it out
    const navigate = useNavigate();
    const moveHome = () =>{
      console.log("Header Move Home")
      navigate("/")
    }
    const moveToMovie = (id) =>{
      navigate("/movies/"+id)
    }
    return (
        <AppBar position="relative"  style={{display: 'flex',background: 'black',width:'100%', height:'6vh'}}>
        <Toolbar variant="dense" color="black">
          <Typography variant="h6" color="inherit" component="div" onClick={()=>moveHome()}>
            FilmIncele
          </Typography>
          <div className = "search">
          <Search>
            {/* <SearchIconWrapper style={{position: 'absolute',left:'0.0005vw',top:'0px'}}>
              <SearchIcon />
            </SearchIconWrapper> */}
                {/* <StyledInputBase id = "searchField"
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={
                      fetchSearch
                  }
              /> */
              <StyledAutocomplete id = "searchField"
                  // placeholder="Search…"
                  InputProps={{ 'aria-label': 'search', startAdornment: ( <InputAdornment position="start"> <SearchIcon /> 
                  </InputAdornment> )}}
                  size='small'
                  options={searchResult}
                  onInputChange={
                    fetchSearch
                  }
                  getOptionLabel={(option) =>option.title || ""}
                  renderOption={(props, option) => <li {...props} onClick={()=>moveToMovie(option.id)}>{option.title}</li>}
                  // renderInput={(params) => <TextField style={{color:'white'}}{...params} label="Search Movies" />}
                  blurOnSelect={true}
                  renderInput={(params) => <StyledTextField {...params} InputProps={{
                    ...params.InputProps,
                    startAdornment: ( <InputAdornment position="start"> <SearchIcon /> 
                    </InputAdornment> ), //this breaks options somehow
                }} label="Search Movies" style={{color:'white'}}   />}
                  
              /> 
              
              }
          </Search>      
          </div>     
          <div className='login'><LoginButton user={user}></LoginButton></div>     
        </Toolbar>
        
      </AppBar>
    )
  }
  
  
  // CSS in JS
  // const headingStyle = {
  //   color: 'red',
  //   backgroundColor: 'black',
  // }
  
  export default Header