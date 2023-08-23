"use client"

import React, {useState,useEffect} from 'react'
import ReactCountryFlag from "react-country-flag"

import { Country } from "@/types"
import { cn } from "@/lib/utils"

interface CartProps{
    countries: Country[],
}

const Cart:React.FC<CartProps> = ({
    countries
}) => {

    const [selectedCountry, setSelectedCountry]= useState("");

    const selectCountry = (e:any) =>{
      setSelectedCountry(e);
    }
    
    useEffect(()=>{
      console.log(selectedCountry,"select");
    },[selectedCountry])

  
    

  return (
    <>
      <div className="grid grid-cols-8 gap-2">
            {countries.length>=1 ? countries.map((country: Country) => (
              <div 
                key={country.code} 
                className={cn("border-2 cursor-pointer border-black rounded p-10 col-span-1 text-center", selectedCountry==country.name ? "bg-green-400" : "bg-white")} 
                onClick={()=>selectCountry(country.name)}>
                <ReactCountryFlag
                  countryCode={country.code}
                  svg
                  style={{
                    width: '2em',
                    height: '2em',
                  }}
                  title={country.code}
                />
                <br />                
                <h3>{country.name}</h3>
                <p className="text-sm">
                {country.capital}</p>
                </div>
            )):(
              <div className="col-span-8 text-center">
                <p>There is no match.</p>
              </div>
            )}        
      </div>
    </>
  )
}

export default Cart