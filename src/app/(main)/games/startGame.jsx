import React from "react";

function StartGame({ gameId, playerWithRoles }) {
  const handleStartGame = async () => {
    try {
      const response = await fetch("/api/start-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId, playerWithRoles }),
      });

      if (response.ok) {
        // Game started successfully
        // You can update your UI accordingly
        console.log("Game started successfully");
      } else {
        // Handle error response here
        const data = await response.json();
        console.error("Failed to start the game:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  return (
    <div className="w-full flex justify-end py-5">
      <button
        className="w-36 bg-red-600 hover:bg-green-600 text-white font-semibold text-xl rounded-2xl py-3 "
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
}

export default StartGame;
