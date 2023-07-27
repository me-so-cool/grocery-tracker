import React from 'react';

//Header  for all pages except main page without Logout button

function Header() {
    return (
        <div className='grid h-fit mt-5'>
            <h1 className="text-5xl font-bold text-center text-blue-1">
                Grocery Tracker
            </h1>
        </div>
    );
}

export default Header;