"use client";

import { UserProvider, useUser } from "../../context/userContext";

import SideNav from "./sideNav";

export default function Layout({ children }) {
  const { user } = useUser();
  return (
    <>
      <UserProvider>
        <div className="bg-slate-800 h-screen w-full   ">
          <div className="flex flex-row h-full">
            <div className="bg-slate-800 h-full w-[240px] fixed top-0 righ-0">
              <SideNav username={user} />
            </div>
            <div className="w-full ml-[240px]  overflow-y-scroll   ">
              {children}
            </div>
          </div>
        </div>
      </UserProvider>
    </>
  );
}
