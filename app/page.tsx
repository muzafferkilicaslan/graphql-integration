
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

import Header from "@/components/header";

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

export default async function Page() {
  const { data } = await getClient().query({ query });

  const variables = data.countries;

  return (
    <>
      <Header />
      <div className="flex items-center mt-2">
        <div>
          <ul>
            {variables.map((item) => (
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
