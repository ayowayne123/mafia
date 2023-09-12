"use client";
import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Router, useRouter } from "next/navigation";

export default function Home() {
  const { login } = useUser();
  const { user } = useUser();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("test");
  useEffect(() => {
    // Check if the user is logged in and, if so, navigate to the games page
    if (user) {
      router.push("/games");
    } else {
      // Set loading to false when user data has been fetched
      setIsLoading(false);
    }
  }, [user]);

  const handleCardClick = () => {
    setShowLoginForm(true);
  };

  const handleAccountChange = () => {
    setHasAccount(false);
  };
  const handleHasAccountChange = () => {
    setHasAccount(true);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasAccount) {
      handleLogin();
    } else if (!hasAccount) {
      handleSignup();
    }
  };
  const handleSignup = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        setMessage("Signup successful!");
      } else {
        const data = await response.json();
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };
  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const userInfo = await response.json();
      if (response.ok) {
        const userData = userInfo.thisUser;
        login(userData);
        setMessage("Log in successful!");
      } else {
        const data = await response.json();
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (!user) {
    return (
      <main className="flex h-[100dvh] min-h-[570px] overflow-scroll flex-col items-center justify-center  bg-stone-800 relative">
        <div
          onClick={handleCardClick}
          className="h-[500px] lg:h-[600px] z-20 w-64 lg:w-80 bg-white text-black px-4 py-2 shadow-white shadow-2xl cursor-pointer relative "
        >
          <div className="h-full w-full justify-between flex-col flex ">
            <div className="text-3xl flex flex-col items-center w-8 ">
              <span className="font-bold">M</span>
              <span className="text-red-600 text-4xl ">&clubs;</span>
            </div>
            {!showLoginForm ? (
              <div className="text-red-600 text-[150px] items-center flex-row justify-center   w-full flex relative">
                &spades;
              </div>
            ) : (
              // Render the login form here
              <form
                className="bg-white text-black px-4 py-2 shadow-white shadow-2xl w-full h-full flex flex-col gap-3"
                onSubmit={handleSubmit}
              >
                <div className="py-3 text-center font-bold text-lg lg:text-2xl tracking-wider uppercase">
                  Welcome to Mafia
                </div>
                {hasAccount ? (
                  <div className="h-full w-full flex flex-col justify-between">
                    <input
                      className="w-full appearance-none outline-none border-b border-black py-2 px-2 placeholder:italic placeholder:text-stone-500"
                      type="text"
                      id="username"
                      placeholder="enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="relative">
                      <input
                        className="w-full appearance-none outline-none border-b border-black py-2 px-2 placeholder:italic placeholder:text-stone-500"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="absolute top-1/2  text-2xl text-red-500 transform -translate-y-1/2 right-2 cursor-pointer"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <>
                            <AiFillEyeInvisible />
                          </>
                        ) : (
                          <>
                            <AiFillEye />
                          </>
                        )}
                      </span>{" "}
                    </div>
                    <button className="bg-red-500 text-white px-4 text-lg py-3 hover:bg-black cursor-pointer">
                      Login
                    </button>
                    <button
                      className="underline text-xs underline-offset-2"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent form submission
                        handleAccountChange();
                      }}
                    >
                      I don&apos;t have an account
                    </button>
                  </div>
                ) : (
                  <div className=" h-full w-full flex flex-col justify-between ">
                    <input
                      className="w-full appearance-none outline-none border-b border-black py-2 px-2 placeholder:italic placeholder:text-stone-500"
                      type="text"
                      id="username"
                      placeholder="create a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      className="w-full appearance-none outline-none border-b border-black py-2 px-2 placeholder:italic placeholder:text-stone-500"
                      type="text"
                      id="email"
                      placeholder="create a email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="relative">
                      <input
                        className="w-full appearance-none outline-none border-b border-black py-2 px-2 placeholder:italic placeholder:text-stone-500"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="absolute top-1/2  text-2xl text-red-500 transform -translate-y-1/2 right-2 cursor-pointer"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <>
                            <AiFillEyeInvisible />
                          </>
                        ) : (
                          <>
                            <AiFillEye />
                          </>
                        )}
                      </span>{" "}
                    </div>
                    <button
                      className="bg-red-500 text-white px-4 text-lg py-3 hover:bg-black cursor-pointer"
                      type="submit"
                    >
                      Sign Up
                    </button>
                    <button
                      className="underline text-xs underline-offset-2"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent form submission
                        handleHasAccountChange();
                      }}
                    >
                      I already have an account
                    </button>
                  </div>
                )}
              </form>
            )}
            <div className="w-full flex justify-end">
              <div className="text-3xl flex flex-col items-center w-8 rotate-180  ">
                <span className="font-bold text-red-600">M</span>
                <span className="text-black text-4xl ">&hearts;</span>
              </div>
            </div>
          </div>
          {!showLoginForm && (
            <div className="uppercase tracking-wider text-white font-bold  absolute -bottom-10 right-0 left-0 text-center flex w-full items-center justify-center">
              click on card
            </div>
          )}
        </div>
        {!showLoginForm && (
          <div className="items-center z-10 justify-center opacity-30 bg-white animate-pings absolute h-[500px] w-64"></div>
        )}
      </main>
    );
  }

  return <div>loading...</div>;
}
