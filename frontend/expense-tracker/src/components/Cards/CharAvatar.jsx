import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full font-medium`}
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
      }}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
