import React from 'react';
import indianFlag from '../images/ind.jpg';

//Common Footer for all the APP
function Footer(){
  return(
    <div className='grid h-fit justify-center bottom-0'>
      <div>
            <p className='inline-block text-center' text-color='black'>
                Copyright© 2023 | Made in Vizag, India  
            </p>
        <img className='inline-block ml-5' height='30px' width='30px' src={indianFlag} alt='Indian Flag' />
    </div>
    </div>
  );
}

export default Footer;