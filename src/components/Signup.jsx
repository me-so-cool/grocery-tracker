import React, {useState} from "react";
import Button from '@mui/material/Button';
import { IconButton, TextField } from "@mui/material";
import  InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import { useNavigate } from 'react-router-dom';



//Sign Up Page for user to signup

function Signup(){

    const [newUser, setUser] = useState({
        username: "",
        password: "",
        confirmpassword: "",
      });

  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

    //SHow password eye handler

  const handleClickShowPassword = () => setShowPassword((show) => !show);

//Store values when username and password are typed

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({...newUser, [e.target.name] : value})
  }

  //handle the submit, send data to backend and route to login page if sign up is successful

  const handleSubmit = (e) => {
    e.preventDefault();
    const addUser = {
    username : (newUser.username).toLowerCase(),
    password: newUser.password,
    confirmpassword: newUser.confirmpassword,
  };  
  
  if(addUser.password === addUser.confirmpassword){
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:9000/Signup',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : addUser
      };
    
      axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.data === "Username already exists!")
      {
        alert("Username already exists, Please try with new username.");
      } else {
      alert(response.data);
      navigate("/Login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  } else {
    alert("Passwords do not match, Please try again!");
  }

}

  return(
    <div className='grid h-auto'>
      <Header />
      <form onSubmit={handleSubmit}>
      <div className='flex flex-col content-evenly items-center'>
        <h1 className="mb-7 text-3xl">Sign Up</h1>
      <div className="mb-7">
        <TextField size="small" id="outlined-basic items1" label="Enter your username" variant="outlined" autoFocus type="text" name="username" required={true} onChange={handleChange} />
      </div>
      <div className="mb-7">
      <TextField className="mt-5" size="small" id="outlined-adornment-password items2" label="Enter your password" variant="outlined"  type={showPassword ? "text" : "password"} 
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      }
      name="password" placeholder="" required={true} onChange={handleChange} />
      </div>
      <div className="mb-7">
      <TextField className="mt-5" size="small" id="outlined-adornment-password items3" label="Confirm your password" variant="outlined"  type={showPassword ? "text" : "password"} 
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      }
      name="confirmpassword" placeholder="" required={true} onChange={handleChange} />
      </div>
      <Button sx={{ backgroundColor: '#22577a',}} style={{
        maxHeight: '30px',
        minHeight: '30px'
      }} type="submit" value="Signup" variant="contained" size="small">Sign up</Button>
      <div className="mt-7">
        <a className="underline" href="localhost:3000/Login">Back to login</a>
      </div>
      </div>
      </form>
      <Footer />
      </div>
  );
}

export default Signup;
