import React from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import  InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import { useNavigate } from 'react-router-dom';

//Login Page for user to login
function Login({username,setUsername, isLoggedIn, setIsLoggedIn}){

  const [showPassword,setShowPassword] = React.useState(false);
  const [userDetails,setUserDetails] = React.useState({
     username : "",
     password : "",
  });

  const navigate = useNavigate();

  //SHow password eye handler
 const handleClickShowPassword = () => setShowPassword((show) => !show);

//Store values when username and password are typed
  const handleChange = (e) => {
    const value = e.target.value
    setUserDetails({...userDetails,[e.target.name] : value})
  }

  //handle the submit, send data to backend and route to main page if login is authenticated
  const handleSubmit = (e) => {
    e.preventDefault();
    const addUser = {
    username : (userDetails.username).toLowerCase(),
    password: userDetails.password,
  };  
  setUsername(addUser.username);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:9000/Login',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : addUser
      };
    
      axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.data === "Username doesn't exist, Please Signup using the Signup button below!")
      {
        alert("Username does not exist, Please Sign Up!");
      } else if(response.data === "Wrong password, please try again!"){
        alert("Wrong password, please try again!");
      } else {
        setIsLoggedIn(true);
        navigate('/');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  } 

  return(
    <div className='grid h-auto'>
      <Header />
      <form onSubmit={handleSubmit}>
      <div className='flex flex-col content-evenly items-center'>
      <div className="mb-7">
        <TextField size="small" id="outlined-basic items" label="Enter your username:" variant="outlined" autoFocus type="text" name="username" placeholder="" required={true} onChange={handleChange} />
      </div>
      <div className="mb-7">
      <TextField className="mt-5" size="small" id="outlined-basic items" label="Enter your password:" variant="outlined" autoFocus type={showPassword ? "text" : "password"}
      endAdornment = {
        <InputAdornment position="end">
          <IconButton
          aria-label="toggle password visibility" 
          onClick={handleClickShowPassword}
          edge="end"
          >
           {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      } name="password" placeholder="" required={true} onChange={handleChange} />
      </div>
      <Button sx={{ backgroundColor: '#22577a',}} style={{
        maxHeight: '30px',
        minHeight: '30px'
      }} type="submit" value="Login" variant="contained" size="small">Login</Button>
      <div className="mt-7">
        <a href="localhost:3000/SignUp">New User? Sign up here!</a>
      </div>
      </div>
      </form>
      <Footer />
      </div>
  );
}

export default Login;