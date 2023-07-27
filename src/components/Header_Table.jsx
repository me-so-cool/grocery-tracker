import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

//Header only for main page which contains a Logout button
function Header_Table({isLoggedIn, setIsLoggedIn}) {

    const navigate = useNavigate();

   //Handle the logged out button
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoggedIn(false);
            navigate('/Login');
          }

    return (
        <div className='flex flex-wrap place-content-center items-center' >
            <h1 className="text-5xl font-bold text-center text-blue-1">
                Grocery Tracker
            </h1>
            <form onSubmit={handleSubmit}>
          <div className='ml-10'>
            <Button  sx={{ backgroundColor: '#22577a',}} style={{
        maxHeight: '30px',
        minHeight: '30px'
      }} type="submit" value="Logout" variant="contained" size="small">Logout</Button>
      </div>
            </form>
        </div>
    );
}

export default Header_Table;