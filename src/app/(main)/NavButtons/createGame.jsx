"use client";
import { useState } from "react";
import { MdAddBox } from "react-icons/md";

function Create({ user }) {
  const handleCreateGame = () => {
    handleCreateApi(user.username);
  };
  console.log(user);
  const handleCreateApi = async (username) => {
    try {
      const response = await fetch("/api/create-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        setMessage("Game Succefully Created");
        console.log(response);
      } else {
        const data = await response.json();
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  return (
    <div>
      <button
        onClick={handleCreateGame}
        className="flex flex-row gap-2  items-center w-full mx-4 p-3 border-2 border-white rounded-xl"
      >
        <span>Create game</span>
        <span>
          <MdAddBox />
        </span>
      </button>
    </div>
  );
}

export default Create;
