import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GraphQL Integration",
  description: "GraphQL Integration with NextJS 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
