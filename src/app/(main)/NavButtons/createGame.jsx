"use client";
import { useState } from "react";
import { MdAddBox } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";

// Generate a random alphanumeric code
function generateCode() {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset[randomIndex];
  }
  console.log(code);
  return code;
}

//Check if the code is unique among existing IDs

function isCodeUnique(code, existingUniqueIds) {
  return !existingUniqueIds.includes(code);
}

// Generate a unique 6-digit alphanumeric code
function generateUniqueCode(existingUniqueIds) {
  let code;
  do {
    code = generateCode(6);
  } while (!isCodeUnique(code, existingUniqueIds));
  return code;
}

// Example usage

function Create({ username, gameExist }) {
  const [ids, setIds] = useState([]);
  const [isModerator, setIsModerator] = useState(false);
  const [started, setStarted] = useState("");

  const handleCreateGame = () => {
    if (isModerator) {
      setStarted("moderator");
    } else if (!isModerator) {
      setStarted("awaiting");
    }
    fetchActiveGames();
    const existingUniqueIds = ids.map((item) => item.unique_id);
    const unique_code = generateUniqueCode(existingUniqueIds);

    gameExist &&
      toast(
        (t) => (
          <span className="h-full flex flex-row">
            Cannot Create game when already playing a game
            <button
              className="text-red-600 font-semibold"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </span>
        ),
        {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    !gameExist && handleCreateApi(username, started, unique_code);
    console.log(gameExist);
  };

  const handleCreateApi = async (username, started, unique_code) => {
    console.log(username);

    try {
      const response = await fetch("/api/create-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, started, unique_code }),
      });

      if (response.ok) {
        toast.success("Game Succefully Created");
        console.log(response);
      } else {
        const data = await response.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  const fetchActiveGames = async () => {
    try {
      const response = await fetch(`/api/fetch-id`);
      const data = await response.json();

      if (response.ok) {
        setIds(data.allIds);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
    }
  };

  return (
    <div>
      <Toaster />
      <button
        onClick={handleCreateGame}
        className="flex flex-row gap-2 bg-green-600 hover:bg-cyan-500 justify-center w-40 mx-4 p-3 items-center border-2 border-white rounded-xl"
      >
        <span>Create game</span>
        <span className="text-2xl">
          <MdAddBox />
        </span>
      </button>
    </div>
  );
}

export default Create;
