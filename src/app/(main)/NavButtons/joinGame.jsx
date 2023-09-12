"use client";
import React from "react";
import { MdAddBox } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";

function Join({ gameExist }) {
  const joinGame = (e) => {
    e.preventDefault();
    gameExist &&
      toast(
        (t) => (
          <span className="h-full flex flex-row">
            Cannot join game, Already in another game
            <button
              className="text-red-600 font-semibold"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </span>
        ),
        {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    !gameExist && toast("check this");
  };
  return (
    <div>
      <Toaster />
      <button
        onClick={joinGame}
        className="flex flex-row gap-2 bg-orange-600 hover:bg-violet-500 justify-center w-40 mx-4 p-3 items-center border-2 border-white rounded-xl"
      >
        <span>Join game</span>
        <span className="text-2xl">
          <MdAddBox />
        </span>
      </button>
    </div>
  );
}

export default Join;
