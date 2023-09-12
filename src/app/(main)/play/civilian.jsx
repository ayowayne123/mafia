import React from "react";
import Image from "next/image";
import civilian from "./roles/civilian.svg";

function Civilian() {
  return (
    <div>
      <div className="h-[450px] w-64 px-4 py-6 bg-white rounded-md flex flex-col justify-between">
        <Image src={civilian} alt="Civilian" />
        <span className="text-[#13378b] tracking-wider justify-center uppercase font-bold text-center text-2xl w-full flex py-2">
          Civilian
        </span>
        <span className="text-sm text-center text-black flex leading-2 font-light">
          As a Civilian, you are an innocent and ordinary member of the town.
          Your objective is to stay alive, trust your instincts, and find and
          eliminate the Mafia before they outnumber you.
        </span>
      </div>
    </div>
  );
}

export default Civilian;
