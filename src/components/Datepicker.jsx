import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "@mui/material";


//DatePicker to show table according to selectec month

function Datepicker({ month, setMonth, loadData }) {
   
    //Handle the change in dropdown
    const handleChange = (event) => {
        setMonth(event.target.value);
        loadData();
        console.log(event.target.value);
      };

    return (
        <div className="flex flex-wrap place-content-center items-center">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Month</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={month}
                    label="Month"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"1"}>January</MenuItem>
                    <MenuItem value={"2"}>February</MenuItem>
                    <MenuItem value={"3"}>March</MenuItem>
                    <MenuItem value={"4"}>April</MenuItem>
                    <MenuItem value={"5"}>May</MenuItem>
                    <MenuItem value={"6"}>June</MenuItem>
                    <MenuItem value={"7"}>July</MenuItem>
                    <MenuItem value={"8"}>August</MenuItem>
                    <MenuItem value={"9"}>September</MenuItem>
                    <MenuItem value={"10"}>October</MenuItem>
                    <MenuItem value={"11"}>November</MenuItem>
                    <MenuItem value={"12"}>December</MenuItem>
                </Select>
            </FormControl>
            <h3 className="mr-5 "> 2023</h3>
          </div >
        );
};

export default Datepicker;