"use client"

import React, { useState, useEffect } from 'react';

import { Button, TextField } from "@mui/material";

interface HeaderProps {
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;  
}

const Header: React.FC<HeaderProps> = ({ setSearchKey }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // setSearchKey(e.target.value);
  };

  const applyFilter =() => {
    setSearchKey(inputValue);
  }

  const removeFilter = () =>{
    setInputValue("");
    setSearchKey("");
  }

  return (
    <div className="top-0 bg-[#fff] sticky z-10 p-8 flex flex-col justify-center items-center border-b border-[#333] ">
      <div>
        <h3 className="text-3xl mb-3 text-center">GraphQL Integration</h3>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full">
        <div className="ml-3 mr-3 mb-2 sm:mb-0">
          <TextField            
            label="Search"
            id="search"            
            size="small"
            value={inputValue}
            onChange={handleInputChange}
          />     
        </div>
        <div className="flex gap-2 mb-2 sm:mb-0">
          <Button variant="outlined" color="success" onClick={applyFilter}>Search</Button>
          <Button variant="outlined" onClick={removeFilter}>Remove Filter</Button>
        </div>        
      </div>
    </div>
  );
}

export default Header;
