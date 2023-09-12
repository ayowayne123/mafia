"use client";
import React, { useEffect, useState } from "react";
import Doctor from "./doctor";
import Detective from "./detective";
import Civilian from "./civilian";
import Mafia from "./mafia";
import { useUser } from "../../../context/userContext";

function Role({ game_id }) {
  const { user } = useUser();
  const [myRole, setMyRole] = useState([]);
  const [mafias, setMafias] = useState([]);
  console.log(game_id, "CHECKS");

  useEffect(() => {
    // Define an async function to fetch player information
    async function fetchPlayers() {
      try {
        const response = await fetch(
          `/api/get-role?gameId=${game_id}&&user_id=${user.user_id}`
        );
        const data = await response.json();

        if (response.ok) {
          setMyRole(data.players);
          setMafias(data.mafia);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("An error occurred: " + error.message);
      }
    }

    // Call the fetchPlayers function when the component mounts
    if (!myRole || myRole.length == 0) {
      // Add a condition to check if players is empty
      fetchPlayers();
    }
  }, [game_id, myRole, user.user_id]);
  console.log(mafias);
  if (!user) {
    return <div>loading...</div>; // or any other placeholder or message
  }

  return (
    <div className=" h-full w-full flex flex-col md:flex-row overflow-hidden items-center gap-5 justify-center md:gap-8">
      <div className="text-white text-lg md:text-2xl lg:text3xl">
        {" "}
        Welcome {user.username}, your role for this game is:
      </div>
      {myRole[0]?.role == "doctor" && <Doctor />}
      {myRole[0]?.role == "civilian" && <Civilian />}
      {myRole[0]?.role == "mafia" && <Mafia />}
      {myRole[0]?.role == "detective" && <Detective />}
    </div>
  );
}

export default Role;
