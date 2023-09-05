"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/userContext";
import SelectPlayers from "./selectPlayers";

function Page() {
  const { user } = useUser();
  const [activeGames, setActiveGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch active games
    async function fetchActiveGames() {
      try {
        const response = await fetch(
          `/api/active-games?userId=${user?.user_id}`
        );
        const data = await response.json();

        if (response.ok) {
          setActiveGames(data.games);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("An error occurred: " + error.message);
      }
    }
    // Call the fetchActiveGames function when the component mounts

    if (user?.user_id) {
      fetchActiveGames();
    }
  }, [user?.user_id]);

  useEffect(() => {
    // Define an async function to fetch player information
    async function fetchPlayers() {
      try {
        const response = await fetch(
          `/api/get-players?gameId=${activeGames.unique_id}`
        );
        const data = await response.json();

        if (response.ok) {
          setPlayers(data.players);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("An error occurred: " + error.message);
      }
    }

    // Call the fetchPlayers function when the component mounts
    if (activeGames?.unique_id) {
      fetchPlayers();
    }
  }, [activeGames]);

  return (
    <div className="text-white  h-full w-full">
      Active games for {user?.username}:<div>There is it</div>
      {user?.user_id === activeGames.host_user_id && (
        <div>
          <div>
            <SelectPlayers players={players} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
