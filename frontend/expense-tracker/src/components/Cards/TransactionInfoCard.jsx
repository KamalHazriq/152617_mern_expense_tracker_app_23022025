import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () => {
    const isDark = document.body.classList.contains("dark-mode");

    return type === "income"
      ? {
          backgroundColor: isDark
            ? "rgba(34, 197, 94, 0.25)"
            : "rgba(34, 197, 94, 0.15)",
          color: "#10b981",
        }
      : {
          backgroundColor: isDark
            ? "rgba(239, 68, 68, 0.25)"
            : "rgba(239, 68, 68, 0.15)",
          color: "#ef4444",
        };
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "var(--card-bg-alt)";
  };

  return (
    <div
      className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg cursor-pointer"
      style={{
        backgroundColor: "var(--card-bg-alt)",
        border: "1px solid var(--card-border)",
        transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-12 h-12 flex items-center justify-center text-xl rounded-full"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--text-color)",
        }}
      >
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-color)",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              marginTop: 4,
              color: "var(--subtext-color)",
            }}
          >
            {date}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              style={{
                color: "var(--subtext-color)",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
              className="group-hover:opacity-100"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-md"
            style={getAmountStyles()}
          >
            <h6 style={{ fontSize: "0.75rem", fontWeight: 500 }}>
              {type === "income" ? "+" : "-"} RM{amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
