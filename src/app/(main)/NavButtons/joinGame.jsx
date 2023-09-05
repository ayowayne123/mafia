"use client";
import React from "react";
import { MdAddBox } from "react-icons/md";

function Join() {
  return (
    <div>
      <div className="flex flex-row gap-2  items-center w-full mx-4 p-3 border-2 border-white rounded-xl">
        <span>Join game</span>
        <span>
          <MdAddBox />
        </span>
      </div>
    </div>
  );
}

export default Join;
