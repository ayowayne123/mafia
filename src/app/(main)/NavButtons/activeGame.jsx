"use client";
import { useState } from "react";
import { MdAddBox } from "react-icons/md";

function Active({ user }) {
  return (
    <div>
      <button className="flex flex-row gap-2  items-center w-20 mx-4 p-3 border-2 border-white rounded-xl">
        <span>Active game</span>
        <span>
          <MdAddBox />
        </span>
      </button>
    </div>
  );
}

export default Active;
