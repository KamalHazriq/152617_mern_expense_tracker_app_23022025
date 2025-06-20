import React from "react";

const CustomTooltip = ({ active, payload }) => {
  const isDark = document.documentElement.classList.contains("dark-mode");

  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: isDark ? "#2e2e2e" : "#ffffff",
          color: isDark ? "#f0f0f0" : "#333333",
          border: "1px solid var(--card-border)",
          borderRadius: "8px",
          padding: "8px",
          fontSize: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            marginBottom: 4,
            color: "#875cf5",
          }}
        >
          {payload[0].name}
        </p>
        <p>
          Amount: <strong>RM{payload[0].value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
