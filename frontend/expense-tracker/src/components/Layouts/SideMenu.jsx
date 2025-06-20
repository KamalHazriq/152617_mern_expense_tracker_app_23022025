import React, { useContext, useEffect, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

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

  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }
    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div
      className="w-64 h-[calc(100vh-61px)] sticky top-[61px] z-20 p-5"
      style={{
        backgroundColor: "var(--card-bg)",
        borderRight: "1px solid var(--card-border)",
        color: "var(--text-color)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5
          className="font-medium leading-6"
          style={{ color: "var(--text-color)" }}
        >
          {user.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item.path)}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${
            activeMenu === item.label
              ? "text-white bg-primary"
              : ""
          }`}
          style={{
            backgroundColor:
              activeMenu === item.label ? "var(--primary)" : "transparent",
            color:
              activeMenu === item.label
                ? "#ffffff"
                : "var(--text-color)",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

      <div className="mt-8">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full text-sm py-2 px-4 rounded-md"
          style={{
            backgroundColor: darkMode
              ? "#444"
              : "#f0f0f0",
            color: "var(--text-color)",
            border: "1px solid var(--card-border)",
            transition: "all 0.3s ease",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
