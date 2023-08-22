
"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

import { Country } from '@/types';
import Header from "@/components/header";

type SuspenseQueryResult<T> = {
  data: T;
};

const query = gql`
  query Now {
    countries(filter: {}) {
      capital
      code
      emoji
      emojiU
      name
    }
  }
`;

export default function Page() {
  const { data } = useSuspenseQuery(query) as SuspenseQueryResult<{ countries: Country[] }>;

  const variables: Country[] = data.countries;


  return (
    <>
      <Header />
      <div className="flex items-center mt-2">
        <div>
          <ul>
            {variables.map((item:any) => (
              <>
                <li>{item.name}</li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
