import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="w-12 h-12 flex items-center justify-center text-2xl rounded-lg"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--primary)",
            border: "1px solid var(--card-border)",
          }}
        >
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <LuImage />
          )}
        </div>

        <p style={{ color: "var(--text-color)", fontSize: "14px" }}>
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className="relative z-10">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full absolute -top-2 -right-2 z-10"
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              color: "var(--subtext-color)",
            }}
          >
            <LuX />
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
