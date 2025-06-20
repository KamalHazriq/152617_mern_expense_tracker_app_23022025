import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
        border: "1px solid var(--card-border)",
        display: "flex",
        gap: "1.5rem",
        alignItems: "center"
      }}
    >
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 style={{ fontSize: "0.875rem", marginBottom: "4px", color: "var(--subtext-color)" }}>
          {label}
        </h6>
        <span style={{ fontSize: "1.375rem" }}>RM{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
