import React from 'react'
import ReactCountryFlag from "react-country-flag"

import { Country } from "@/types"

interface CartProps{
    countries: Country[],
}

const Cart:React.FC<CartProps> = ({
    countries
}) => {

    const smiley = "1"
  return (
    <>
      <div className="grid grid-cols-8 gap-2">
            {countries.map((country: Country) => (
              <div key={country.code} className="border border-black rounded p-10 col-span-1 text-center">
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
            ))}        
      </div>
    </>
  )
}

export default Cart
