"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleCardClick = () => {
    setShowLoginForm(true);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center p-10 bg-stone-800 relative">
      <div
        onClick={handleCardClick}
        className="h-[500px] z-20 w-64 bg-white text-black px-4 py-2 shadow-white shadow-2xl cursor-pointer relative "
      >
        <div className="h-full w-full justify-between flex-col flex">
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
              className="bg-white text-black px-4 py-2 shadow-white shadow-2xl w-full flex flex-col gap-3"
              // onSubmit={handleSubmit}
            >
              <div className="py-3 text-center font-bold text-lg tracking-wider uppercase">
                Welcome to Mafia
              </div>
              {/* For example: */}
              <input
                className="w-full appearance-none outline-none border-b border-black py-2 px-2 placeholder:italic placeholder:text-stone-500"
                type="text"
                id="username"
                placeholder="enter your username"
              />
              <div className="relative">
                <input
                  className="w-full appearance-none outline-none border-b border-black py-2 px-2 placeholder:italic placeholder:text-stone-500"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="enter password"
                />
                <span
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>{" "}
              </div>
              <button
                className="bg-red-500 text-white px-4 text-lg py-3 hover:bg-black cursor-pointer"
                type="submit"
              >
                Login
              </button>
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
