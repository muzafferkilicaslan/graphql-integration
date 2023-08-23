"use client";

import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

import { Country } from "@/types";
import { cn } from "@/lib/utils";
import { Button} from "@mui/material";

interface CartProps {
  countries: Country[];
}

const Cart: React.FC<CartProps> = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [page, setPage] = useState(1);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(10);
  
  const selectCountry = (e: any) => {
    setSelectedCountry(e);
  };

  useEffect(() => {
    console.log(selectedCountry, "select");
  }, [selectedCountry]);

  const previousPage = () =>{
    if(page!=1){
      setPageStart(pageStart-10);
      setPage(page-1);
      setPageEnd(pageEnd-10);
    }
  }

  const nextPage = () =>{
    setPageStart(pageStart+10);
    setPage(page+1);
    setPageEnd(pageEnd+10);
  }

  return (
    <>      
      <div className="grid grid-cols-10 gap-2">
        {countries.length >= 1 ? (
          countries.slice(pageStart, pageEnd).map((country: Country) => (
            <div
              key={country.code}
              className={cn(
                "border-2 cursor-pointer border-black rounded p-10 col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5 xl:col-span-2 text-center",
                selectedCountry == country.name ? "bg-green-400" : "bg-white"
              )}
              onClick={() => selectCountry(country.name)}
            >
              <ReactCountryFlag
                countryCode={country.code}
                svg
                style={{
                  width: "2em",
                  height: "2em",
                }}
                title={country.code}
              />
              <br />
              <h3>{country.name}</h3>
              <p className="text-sm">{country.capital}</p>
            </div>
          ))
        ) : (
          <div className="col-span-12 text-center">
            <p>There is no match.</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center mt-5 items-center">
          <Button variant="outlined" className={cn(page==1 ? "disabled" : '')} onClick={previousPage}>-</Button>
          <p className="p-5">{page}</p>
          <Button variant="outlined" onClick={nextPage}>+</Button>
      </div>
    </>
  );
};

export default Cart;
