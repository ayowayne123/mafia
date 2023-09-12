"use client";
import React, { useState, useEffect } from "react";

function HostChoicesForm({ onSubmit, TotalPlayers }) {
  const [hasDoctor, setHasDoctor] = useState(false);
  const [hasDetective, setHasDetective] = useState(false);
  const [numMafia, setNumMafia] = useState(1);
  const [maxMafia, setMaxMafia] = useState(1);

  const handleNumMafiaChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumMafia(value);
  };
  useEffect(() => {
    if (TotalPlayers >= 6 && TotalPlayers <= 8) {
      setMaxMafia(2);
    } else if (TotalPlayers > 8 && TotalPlayers <= 12) {
      setMaxMafia(3);
    } else if (TotalPlayers > 12) {
      setMaxMafia(4);
    }
  }, [TotalPlayers]);
  // Check the allowed number of mafia based on total players

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the host's choices to the parent component
    onSubmit({ hasDoctor, hasDetective, numMafia });
  };

  return (
    <form onSubmit={handleSubmit} className="text-black   ">
      <div className="py-2 text-center text-2xl font-semibold ">
        Confirm Game Settings
      </div>
      <div className="py-2">
        <label>
          <input
            type="checkbox"
            checked={hasDoctor}
            onChange={() => setHasDoctor(!hasDoctor)}
          />
          Include Doctor
        </label>
      </div>
      <div className="py-2">
        <label>
          <input
            type="checkbox"
            checked={hasDetective}
            onChange={() => setHasDetective(!hasDetective)}
          />
          Include Detective
        </label>
      </div>
      <div className="py-2">
        <label>
          Number of Mafia:
          <input
            className="text-black"
            type="number"
            value={numMafia}
            onChange={handleNumMafiaChange}
            min="1"
            max={maxMafia}
          />
        </label>
      </div>
      <div className="py-2">
        {" "}
        <label>Total Number of Players :{TotalPlayers}</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default HostChoicesForm;
