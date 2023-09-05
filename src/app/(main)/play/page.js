"use client";
import React from "react";
import Doctor from "./doctor";
import Detective from "./detective";
import Civilian from "./civilian";
import Mafia from "./mafia";
import { useUser } from "../../../context/userContext";

function Page() {
  const { user } = useUser();
  if (!user) {
    return <div>loading...</div>; // or any other placeholder or message
  }

  return (
    <div className="bg-[#0D0D0D] h-screen w-full flex flex-col md:flex-row overflow-hidden items-center gap-5 justify-center md:gap-8">
      <div className="text-white text-lg md:text-2xl lg:text3xl">
        {" "}
        Welcome {user}, your role for this game is:
      </div>
      <Doctor />
      {/* <Civilian />
      <Mafia />
      <Detective /> */}
    </div>
  );
}

export default Page;
