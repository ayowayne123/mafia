"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/userContext";
import SelectPlayers from "./selectPlayers";
import Roles from "./playerRoles";
import HostChoicesForm from "./hostChoices";
import StartGame from "./startGame";
import { FaTimesCircle } from "react-icons/fa";
import Role from "../play/Role";

function Page() {
  const { user } = useUser();
  const [activeGames, setActiveGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerWithRoles, setPlayerWithRoles] = useState([]);
  const [rolesAssigned, setRolesAssigned] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [cannotStart, setCannotStart] = useState(true);

  const [error, setError] = useState(null);
  const [hostChoices, setHostChoices] = useState({
    moderator: false,
    numberOfMafia: 0,
    hasDoctor: false,
    hasDetective: false,
  });
  const [hostChosen, setHostChosen] = useState(null);

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

    if (user?.user_id && activeGames.length === 0) {
      fetchActiveGames();
    }
  }, [user?.user_id, activeGames]);

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
    if (activeGames?.unique_id && players.length === 0) {
      // Add a condition to check if players is empty
      fetchPlayers();
    }
  }, [activeGames, players]);

  const playersRoles = players.map((player) => ({
    user_id: player.user_id,
    username: player.username,
    role: player.role,
  }));

  const handleHostChoices = (choices) => {
    setHostChosen(choices);
  };

  const handleCanStart = (start) => {
    setCannotStart(start);
  };

  useEffect(() => {
    if (hostChosen) {
      setHostChoices({
        ...hostChoices,
        numberOfMafia: hostChosen.numMafia,
        hasDoctor: hostChosen.hasDoctor,
        hasDetective: hostChosen.hasDetective,
      });
    }
  }, [hostChosen]);

  const closeStart = () => {
    setCannotStart(true);
  };
  const handlePlayerWithRoles = (roles) => {
    // Check if roles have been assigned
    if (!rolesAssigned && roles.length > 0) {
      setPlayerWithRoles(roles);
      if (playerWithRoles) {
        setRolesAssigned(true);
      }
    }
  };

  return (
    <div className="text-white  h-full w-full">
      Active games for {user?.username}:
      {activeGames.status == "pending" &&
        user?.user_id === activeGames?.host_user_id && (
          <div>
            <SelectPlayers players={players} canStart={handleCanStart} />
            <div></div>
            <Roles
              players={playersRoles}
              hostChoices={hostChoices}
              hostChosen={hostChosen}
              onSubmit={handlePlayerWithRoles}
            />

            {!cannotStart && (
              <div
                onClick={closeStart}
                className="fixed bg-[#00000067] inset-0 z-20 w-full h-full flex items-center justify-center"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white  w-[600px] p-5 relative"
                >
                  <div className="text-3xl text-red-500 font-semibold top-0 right-0 text-right flex justify-end items-end  cursor-pointer hover:text-red-400">
                    <FaTimesCircle onClick={closeStart} />
                  </div>
                  <HostChoicesForm
                    onSubmit={handleHostChoices}
                    TotalPlayers={players.length}
                  />
                  {playerWithRoles && (
                    <StartGame
                      gameId={players[0]?.game_id}
                      playerWithRoles={playerWithRoles}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      {activeGames.status == "pending" &&
        user?.user_id !== activeGames?.host_user_id && (
          <div>Waiting for Host to start Game</div>
        )}
      {activeGames.status == "started" && (
        <div className="h-full">
          Game with Id: {activeGames.unique_id} has started, enjoy with your
          friends
          <Role game_id={players[0]?.game_id} />
        </div>
      )}
      {/* {activeGames.status == "started" &&
        user?.user_id == activeGames?.host_user_id && (
          
        )} */}
    </div>
  );
}

export default Page;
