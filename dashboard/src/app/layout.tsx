import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { Container } from "./components/Container";
import { ApolloClientProvider } from "./Providers/ApolloClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full Stack Engineer Challenge",
  description: "Created by: Taranjeet Singh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="m-auto max-w-screen-md">
          <AppRouterCacheProvider>
            <Container>
              <ApolloClientProvider>{children}</ApolloClientProvider>
            </Container>
          </AppRouterCacheProvider>
        </main>
      </body>
    </html>
  );
}
