import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm" style={{ color: "var(--text-color)" }}>
        {content}
      </p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onDelete}
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
