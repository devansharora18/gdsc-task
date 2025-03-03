"use client";

import React, { useState } from "react";

const Login = () => {

  const [username, setUsername] = useState("michaelw");
  const [password, setPassword] = useState("michaelwpass");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md p-6 bg-[var(--card)] rounded-2xl shadow-lg border border-[var(--input)]">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-[var(--input)] rounded-xl bg-[var(--input)] text-[var(--foreground)] transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-[var(--input)] rounded-xl bg-[var(--input)] text-[var(--foreground)] transition"
          />

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] p-3 rounded-xl hover:bg-[var(--primary-hover)] transition flex items-center justify-center cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="mt-4 w-full p-3 rounded-xl bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)] transition"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Login;