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
  const [page,setPage] = useState(1);

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
      <Header setSearchKey={setSearchKey} setPage={setPage} />
      <div className="flex w-full bg-[#f5f5f5] h-[calc(100vh-153px)]">
        <div className="p-10 w-full">
          <Cart countries={countries} page={page} setPage={setPage} />          
        </div>
      </div>
    </>
  );
}