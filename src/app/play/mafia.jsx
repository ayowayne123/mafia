import React from "react";
import Image from "next/image";
import mafia from "./roles/mafia.svg";

function Mafia() {
  return (
    <div>
      <div className="h-[450px] w-64 px-4 py-6 bg-white rounded-md flex flex-col justify-between">
        <Image src={mafia} alt="mafia" />
        <span className="text-[#000] tracking-wider justify-center uppercase font-bold text-center text-2xl w-full flex py-2">
          mafia
        </span>
        <span className="text-sm text-center flex leading-2 font-light">
          You are part of the Mafia, a group of ruthless infiltrators. Blend in
          as a Civilian during the day, and each night, collaborate with your
          fellow Mafia members to eliminate a target. Deception is your key to
          victory.
        </span>
      </div>
    </div>
  );
}

export default Mafia;
