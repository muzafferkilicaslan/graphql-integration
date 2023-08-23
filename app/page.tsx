"use client"

import { useState } from "react";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";


import { Country } from '@/types';
import Header from "@/components/header";
import Cart from "@/components/cart";

type SuspenseQueryResult<T> = {
  data: T;
};

const query = gql`
  query GetCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      capital
      code      
      name
    }
  }
`;

export default function Page() {
  const [searchKey, setSearchKey] = useState("");
  let variables: { filter?: { code?: { eq: string } } } = {};

  if (searchKey !== "") {
    variables = {
      filter: {
        code: { eq: searchKey.toUpperCase() }
      }
    };
  }

  const { data } = useSuspenseQuery(query, {
    variables
  }) as SuspenseQueryResult<{ countries: Country[] }>;

  const countries: Country[] = data.countries;

  
  

  return (
    <>
      <Header setSearchKey={setSearchKey} />
      <div className="flex w-full items-center bg-[#f5f5f5]">
        <div className="p-10 w-full">
          <Cart countries={countries} />
        </div>
      </div>
    </>
  );
}