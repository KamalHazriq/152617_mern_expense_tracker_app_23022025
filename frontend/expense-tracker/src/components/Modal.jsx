import React from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm px-4">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div
          className="rounded-lg shadow-sm transition-all duration-300"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--text-color)",
            border: "1px solid var(--card-border)",
          }}
        >
          {/* Modal header */}
          <div
            className="flex items-center justify-between p-4 border-b rounded-t"
            style={{ borderBottom: "1px solid var(--card-border)" }}
          >
            <h3 className="text-lg font-medium">{title}</h3>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition"
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--subtext-color)",
                border: "1px solid var(--card-border)",
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
