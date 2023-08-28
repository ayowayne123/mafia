import React from "react";
import Image from "next/image";
import doc from "@/app/play/roles/doctor.svg";

function Doctor() {
  return (
    <div>
      <div className="h-[450px] w-64 px-4 py-6 bg-white rounded-md flex flex-col justify-between">
        <Image src={doc} alt="doctor" />
        <span className="text-[#E0292F] tracking-wider justify-center uppercase font-bold text-center text-2xl w-full flex py-2">
          Doctor
        </span>
        <span className="text-base text-center flex leading-2 font-light">
          You are the Doctor, the town&apos;s skilled healer. Each night, you
          can choose to protect one player from the Mafia&apos;s attacks. Use
          your power wisely to save lives.
        </span>
      </div>
    </div>
  );
}

export default Doctor;
