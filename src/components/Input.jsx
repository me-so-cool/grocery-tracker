import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";


//Input function which takes three inputs and sends data to API
function Input({items, setItems, loadData, username, setUsername}){

  //Initial values of the form data
const [values, setValues] = useState({
  name: "",
  quantity: "",
  price:0,
});

//Function to store the variable from each form item to values on change of the field
const handleChange = (e) => {
  const value = e.target.value;
  setValues({...values, [e.target.name] : value});
};

//Function to post the data to API using axios when user clicks submit button
const handleSubmit = (e) => {
  e.preventDefault();
  const newItem = {
    name : values.name,
    quantity: values.quantity,
    price: values.price,
    username: username,
  };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:9000/',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : newItem
  };

  axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  setItems([...items,newItem]);
  loadData();
})
.catch((error) => {
  console.log(error);
});

}


//Main return function to display form with text boxes and submit button
  return(

    <div className='grid h-auto'>
      <form onSubmit={handleSubmit}>
      <div className='flex flex-wrap place-content-around items-center'>
      <TextField size="small" id="outlined-basic items" label="Enter your item:" variant="outlined" autoFocus type="text" name="name" placeholder="Tomatoes, Milk, Atta etc." required={true} onChange={handleChange} />
      <TextField size="small" id="outlined-basic items" label="Enter item quantity:" variant="outlined" autoFocus type="text" name="quantity" placeholder="1 Kg, 2 Packets, 500 ml etc." required={true} onChange={handleChange} />
      <TextField size="small" id="outlined-basic items" label="Enter the price: " variant="outlined" autoFocus type="number" name="price" placeholder="Rs. 100, Rs. 56, Rs. 47 etc." required={true} onChange={handleChange} />
      <Button sx={{ backgroundColor: '#22577a',}} style={{
        maxHeight: '30px',
        minHeight: '30px'
      }} type="submit" value="Add" variant="contained" size="small">Add</Button>
      </div>
      </form>
      </div>
  )

 }

export default Input;