"use client";

import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

import { Country } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@mui/material";

interface CartProps {
  countries: Country[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  backgroundColor: string;
}

const Cart: React.FC<CartProps> = ({
  countries,
  page,
  setPage,
  backgroundColor,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(10);

  const selectCountry = (e: any) => {
    if (selectedCountry == e) {
      setSelectedCountry("");
    } else {
      setSelectedCountry(e);
    }
  };

  const [data, setData] = useState<Country[]>([]);

  useEffect(() => {
    if (countries) {
      setData(countries);
    }
    selectLast();
  }, [countries]);

  useEffect(() => {
    console.log(selectedCountry, "select");
  }, [selectedCountry]);

  const previousPage = () => {
    if (page != 1) {
      setPageStart(pageStart - 10);
      setPage(page - 1);
      setPageEnd(pageEnd - 10);
    }
  };

  useEffect(() => {
    if (data.length >= 1) {
      selectLast();
    }
  }, [pageEnd, data]);

  const nextPage = () => {
    if (page < data.length / 10) {
      console.log(data.length / 10, "data");
      setPageStart(pageStart + 10);
      setPage(page + 1);
      setPageEnd(pageEnd + 10);
    }
  };

  const selectLast = () => {
    if (data.length >= 10) {
      setSelectedCountry(data[pageEnd - 1].name);
    } else if (data.length >= 1) {
      setSelectedCountry(data[data.length - 1].name);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-2">
        {data.length > 10 ? (
          data.slice(pageStart, pageEnd).map((country: Country) => {
            const isCountrySelected = selectedCountry === country.name;
            const dynamicBackgroundColor = isCountrySelected
              ? backgroundColor
              : "white";

            return (
              <div
                key={country.code}
                className={cn(
                  "border-2 cursor-pointer border-black rounded p-10 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 text-center",
                  isCountrySelected ? "dynamicBackgroundColorClass" : "bg-white"
                )}
                style={{ backgroundColor: dynamicBackgroundColor }}
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
                <h3 className="mb-5 h-[50px] flex align-middle justify-center items-center">{country.name}</h3>
                <p className="text-sm">{country.capital}</p>
              </div>
            );
          })
        ) : data.length >= 1 ? (
          data.map((country: Country) => {
            const isCountrySelected = selectedCountry === country.name;
            const dynamicBackgroundColor = isCountrySelected
              ? backgroundColor
              : "white";
            return (
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
            );
          })
        ) : (
          <div className="col-span-12 text-center">
            <p>There is no match.</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center mt-5 items-center">
        <Button variant="outlined" disabled={page == 1} onClick={previousPage}>
          -
        </Button>
        <p className="p-5">{page}</p>
        <Button
          disabled={page >= data.length / 10}
          variant="outlined"
          onClick={nextPage}
        >
          +
        </Button>
      </div>
    </>
  );
};

export default Cart;
