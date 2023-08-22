"use client"

import { useState } from "react";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";


import { Country } from '@/types';
import Header from "@/components/header";

type SuspenseQueryResult<T> = {
  data: T;
};

const query = gql`
  query GetCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      capital
      code
      emoji
      emojiU
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
        code: { eq: searchKey }
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
      <div className="flex items-center mt-2">
        <div className="p-10">
          <ul>
            {countries.map((country: Country) => (
              <li key={country.code}>{country.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}