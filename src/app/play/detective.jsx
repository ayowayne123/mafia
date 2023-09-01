import React from "react";
import Image from "next/image";
import detective from "./roles/detective.svg";

function Detective() {
  return (
    <div>
      <div className="h-[450px] w-64 px-4 py-6 bg-white rounded-md flex flex-col justify-between">
        <Image src={detective} alt="detective" />
        <span className="text-[#805100] tracking-wider justify-center uppercase font-bold text-center text-2xl w-full flex py-2">
          Detective
        </span>
        <span className="text-sm text-center flex leading-2 font-light">
          As the Detective, your sharp instincts are your greatest asset. Each
          night, you can investigate one player to determine if they belong to
          the Mafia or not. Uncover the truth to help the town survive.
        </span>
      </div>
    </div>
  );
}

export default Detective;
