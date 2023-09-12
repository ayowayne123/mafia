"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Create from "../NavButtons/createGame";
import Join from "../NavButtons/joinGame";
import { useUser } from "../../../context/userContext";

function Page() {
  const { user } = useUser();
  const [activeGames, setActiveGames] = useState([]);
  const [gameExist, setGameExist] = useState(false);

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

    if (user?.user_id && activeGames?.length === 0) {
      fetchActiveGames();
    }
  }, [user?.user_id, activeGames]);
  useEffect(() => {
    if (activeGames?.length !== 0) {
      setGameExist(true);
      console.log(activeGames, "herre");
    }
    activeGames && setGameExist(true);
  }, []);
  return (
    <div className="text-white h-full w-full p-5">
      <div className="w-[500px] h-80 flex flex-row justify-between items-center mx-auto">
        <Create gameExist={gameExist} username={user?.username} />
        <Join gameExist={gameExist} />
      </div>
      {activeGames && (
        <div className="flex flex-row gap-8 items-center">
          <span> You have an active Game :</span>
          <Link
            href="/games"
            className="w-32 h-8 text-lg font-semibold flex items-center justify-center rounded-lg bg-amber-700"
          >
            Play Game
          </Link>
        </div>
      )}
    </div>
  );
}

export default Page;
