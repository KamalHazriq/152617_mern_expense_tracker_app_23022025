import React, { useEffect, useState } from "react";

const AuthLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative transition-colors duration-500"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #1e1e1e, #2a2a2a)"
          : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        color: "var(--text-color)",
      }}
    >
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 text-sm border rounded-md transition-all duration-300 shadow-sm"
          style={{
            backgroundColor: darkMode ? "#444" : "#ffffff",
            color: "var(--text-color)",
            border: "1px solid var(--card-border)",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Centered Card */}
      <div
        className="w-full max-w-md p-8 rounded-xl shadow-lg transition-all duration-500"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--text-color)",
          border: "1px solid var(--card-border)",
        }}
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          FinTrack: Your Personal Finance Tracker
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
