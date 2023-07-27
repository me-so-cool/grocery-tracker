import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from '@mui/material';
import { Checkbox } from '@mui/material';
import Footer from "./Footer.jsx";
import Input from "./Input.jsx";
import Datepicker from './Datepicker.jsx';
import HeaderTable from "./Header_Table.jsx";

//Function to render the table
function ShowTable({ items, setItems, loadData, month, setMonth, username, setUsername, isLoggedIn, setIsLoggedIn }) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false); // Add this line

  //Use effect to render the table initially
  useEffect(() => {
    console.log(username);
    loadData();
  },[]);

  //Function to handle the checked checkboxes
  function handleCheck(e) {
    const itemId = e.target.id;
    const isChecked = e.target.checked;
    setCheckedItems((prevCheckedItems) => {
      if (isChecked) {
        return [...prevCheckedItems, itemId];
      } else {
        return prevCheckedItems.filter((id) => id !== itemId);
      }
    });
  }

  //Function to delte the selected checkboxes
  function handleDelete() {
    checkedItems.forEach((checkeditem) => {
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'http://localhost:9000',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          id: checkeditem,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setItems([items]);
          loadData();
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setCheckedItems([]);
  }


  //Function to display items in the items array as rows in table
  const ItemList = ({ items }) => {
    if (!items) return null;
    const listItems = items.map((item) => (
  
      <TableRow>
        <TableCell key={crypto.randomUUID()}>
          <Checkbox
            id={item._id}
            name={item.isChecked}
            value={item.isChecked}
            checked={checkedItems.includes(item._id)}
            onChange={(e) => handleCheck(e)}
          ></Checkbox>
        </TableCell>
        <TableCell align="center" key={item.name + crypto.randomUUID()}>
          {item.name}
        </TableCell>
        <TableCell align="center" key={item.name + crypto.randomUUID()}>
          {item.quantity}
        </TableCell>
        <TableCell align="center" key={item.name + crypto.randomUUID()}>
          {item.price}
        </TableCell>
      </TableRow>
    ));

    //Return the list Items from ItemList after rendering is done
    return <>{listItems}</>;
  };

  //Main return div for the table which calls ItemList function to show items as rows in the table
  return (
    <>
    <HeaderTable isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    <Input items={items} setItems={setItems} loadData = {loadData} username={username} setUsername={setUsername} />
    <Datepicker month={month} setMonth={setMonth} loadData = {loadData} />
      <div className="grid grid-flow-col auto-rows-max max-w-full justify-center place-content-center">
        <TableContainer component={Paper} elevation={12}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Items</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Replace this with your ItemList component */}
              {/* <ItemList items={items} /> */}
              <ItemList items={items} />
            </TableBody>
          </Table>
        </TableContainer>
        <div className="inline-flex h-fit ml-5 justify-center">
          {checkedItems.length > 0 ? (
            <Button
            sx={{ backgroundColor: '#22577a',}}
            style={{
                maxHeight: '30px',
                minHeight: '30px',
              }}
              variant="contained"
              size="small"
              onClick={handleDelete}
              type="submit"
              value="Delete"
            >
              Delete
            </Button>
          ) : null}
        </div>
        {deleteSuccess && <p>Successfully deleted</p>}
      </div>
      <Footer />
    </>
  );
}

export default ShowTable;
