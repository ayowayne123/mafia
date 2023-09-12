"use client";
import { useState } from "react";
import React from "react";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function Roles({ players, hostChoices, hostChosen, onSubmit }) {
  if (hostChosen && hostChoices.numberOfMafia !== 0) {
    const availableRoles = [];
    for (let i = 0; i < hostChoices.numberOfMafia; i++) {
      availableRoles.push("mafia");
    }

    if (hostChoices.hasDoctor) {
      availableRoles.push("doctor");
    }
    if (hostChoices.hasDetective) {
      availableRoles.push("detective");
    }

    const indicesToShuffle = [...Array(players.length).keys()];

    shuffleArray(indicesToShuffle);

    let mafiaCount = 0;
    let doctorCount = 0;
    let detectiveCount = 0;

    for (let i = 0; i < players.length; i++) {
      if (availableRoles.length === 0) {
        break;
      }

      // Randomly select a role from the availableRoles array
      const randomIndex = Math.floor(Math.random() * availableRoles.length);
      const selectedRole = availableRoles.splice(randomIndex, 1)[0];

      // Assign the selected role to the player
      players[indicesToShuffle[i]].role = selectedRole;

      // Update role counters
      if (selectedRole === "mafia") {
        mafiaCount++;
      } else if (selectedRole === "doctor") {
        doctorCount++;
      } else if (selectedRole === "detective") {
        detectiveCount++;
      }

      // Check if the host's specified number of players have received roles
      if (mafiaCount + doctorCount + detectiveCount === 5) {
        break; // The specified number of players have received roles
      }
    }
  }

  if (hostChosen && hostChoices.numberOfMafia !== 0) {
    const playersRoles = () => {
      onSubmit(players);
    };

    playersRoles();
  }
  return;
}

export default Roles;
