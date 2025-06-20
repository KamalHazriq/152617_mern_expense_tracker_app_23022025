import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ label, value, onChange, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4">
      {label && (
        <label
          className="text-sm font-medium block mb-1"
          style={{ color: "var(--text-color)" }}
        >
          {label}
        </label>
      )}

      <div
        className="flex items-center justify-between px-3 py-2 rounded-md border transition duration-300"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          color: "var(--text-color)",
        }}
      >
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm"
          style={{ color: "var(--text-color)" }}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={20}
              onClick={toggleShowPassword}
              className="cursor-pointer"
              style={{ color: "var(--primary)" }}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              onClick={toggleShowPassword}
              className="cursor-pointer"
              style={{ color: "var(--subtext-color)" }}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
