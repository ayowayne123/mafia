"use client";

import { UserProvider, useUser } from "../../context/userContext";
import Header from "./header";

export default function Layout({ children }) {
  const { user } = useUser();
  return (
    <>
      <UserProvider>
        <Header username={user} />
        {children}
      </UserProvider>
    </>
  );
}
