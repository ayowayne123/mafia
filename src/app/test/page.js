"use client";
import { useState } from "react";

export default function CreateGame() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/create-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        setMessage("Game created successfully!");
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
      <h1>Create Game</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </label>
        <button type="submit">Create Game</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
