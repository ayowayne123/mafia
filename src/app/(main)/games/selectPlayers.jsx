"use client";
import React, { useState, useEffect } from "react";

function SelectPlayers({ players }) {
  const [localPlayers, setLocalPlayers] = useState(players);
  console.log(localPlayers, players, setLocalPlayers);

  useEffect(() => {
    setLocalPlayers(players);
  }, [players]);

  const updatePlayerStatus = async (playerId, newStatus, gameId) => {
    try {
      const response = await fetch("/api/update-player-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerId, newStatus, gameId }),
      });

      if (response.ok) {
        const updatedPlayers = await response.json();
        const updatedLocalPlayers = localPlayers.map((player) =>
          player.user_id === playerId
            ? { ...player, started: newStatus }
            : player
        );
        setLocalPlayers(updatedLocalPlayers);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
    }
  };
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {localPlayers.map((player) => (
            <tr key={player?.user_id}>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-white">
                {player.username}
              </td>
              {player.started == "awaiting" && (
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <button
                    onClick={() =>
                      updatePlayerStatus(
                        player.user_id,
                        "ready",
                        player.game_id
                      )
                    }
                    className="text-green-600 hover:text-green-900"
                  >
                    Mark as Ready
                  </button>
                  <button
                    onClick={() =>
                      updatePlayerStatus(player.user_id, "removed")
                    }
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              )}
              {player.started == "ready" && (
                <td className="px-6 py-4 whitespace-no-wrap text-right text-green-500 text-sm leading-5 font-medium">
                  Ready
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {error && <div className="text-red-500">{error}</div>} */}
    </div>
  );
}

export default SelectPlayers;
