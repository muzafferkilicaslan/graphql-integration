"use client"

import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';


interface HeaderProps {
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ setSearchKey }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSearchKey(e.target.value);
  };


  const removeFilter = () =>{
    setInputValue("");
  }

  useEffect(() => {
    if (!inputValue) {
      setSearchKey("");
    }
  }, [inputValue]);

  return (
    <div className="p-10 flex flex-col justify-center items-center border-b border-[#333] ">
      <div>
        <h3 className="text-3xl mb-3">GraphQL Integration</h3>
      </div>
      <div className="flex items-center">
        <TextField
          label="Search"
          id="search"
          className="w-[500px]"
          value={inputValue}
          onChange={handleInputChange}
        />        
        <Button onClick={removeFilter}>Remove Filter</Button>
      </div>
    </div>
  );
}

export default Header;
