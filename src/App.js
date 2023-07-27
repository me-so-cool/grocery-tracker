import React from 'react';
import Header from "./components/Header";
import Footer from './components/Footer';
import Input from './components/Input';
import Table from './components/Table';
import Datepicker from './components/Datepicker';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from "axios";
import ReactDOM from "react-dom/client";
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";




export default function App() {
  const [items, setItems] = useState([]);
  const [month, setMonth] = useState('7');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   //Function to fetch data from backend using axios et request and setItems to see changes in UI
   const loadData = async () =>  {
    const url = month || username ? `http://localhost:9000/?${month ? `month=${month}` : ''}${month && username ? '&' : ''}${username ? `username=${username}` : ''}` : 'http://localhost:9000/';
    await axios.get(url)
           .then(function (res) {
             console.log(res.data);
              (res.data).forEach(element => {
                   element['isChecked'] = 'false'; 
               });  
               // eslint-disable-next-line
               setItems(res.data);
           })
           .catch(function (err) {
               console.log(err);
           });
       }



  return (
    <div className='grid gap-28 h-screen w-screen'>
{/*     <Input items={items} setItems={setItems} loadData = {loadData}/>
    <Datepicker items={items} setItems={setItems} loadData = {loadData}/>
    <Table items={items} setItems={setItems} loadData = {loadData}/> */}
<BrowserRouter>
<Routes>
  <Route
    path="/"
    element={
      <ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Table
          items={items}
          setItems={setItems}
          loadData={loadData}
          month={month}
          setMonth={setMonth}
          username={username}
          setUsername={setUsername}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </ProtectedRoute>
    }
  />
  <Route path="/Login" element={<Login username={username} setUsername={setUsername} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/Signup" element={<Signup />} />
  <Route path="*" element={<></>} />
</Routes>

      </BrowserRouter>
    </div>
  )
}