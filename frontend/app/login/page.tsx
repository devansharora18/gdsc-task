"use client"

import React, { useState } from "react";
import Themeswitcher from "../components/Themeswitcher";
import Image from "next/image";

const Login = () => {
  const [username, setUsername] = useState("michaelw");
  const [password, setPassword] = useState("michaelwpass");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { accessToken } = data;
        console.log(accessToken);
        localStorage.setItem("token", accessToken);
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required");
      return;
    }
    login(username, password);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 sm:px-8 lg:px-12 py-10">
      <div className="absolute top-6 right-6">
        <Themeswitcher />
      </div>

      <div className="flex flex-col items-center mb-8">
        <Image src={'/gdsc.svg'} alt="GDSC Logo" width={120} height={120} />
        <h1 className="text-5xl font-extrabold mt-4">GDSC HUB</h1>
      </div>

      <div className="w-full max-w-lg p-8 bg-[var(--card)] rounded-3xl shadow-xl border border-[var(--input)]">
        <h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 border border-[var(--input)] rounded-lg bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-[var(--input)] rounded-lg bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] p-4 rounded-lg hover:bg-[var(--primary-hover)] transition flex items-center justify-center cursor-pointer font-semibold text-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-6 h-6"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
