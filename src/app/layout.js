import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "../context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mafia by Wayne",
  description: "A game of Mafia for friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
