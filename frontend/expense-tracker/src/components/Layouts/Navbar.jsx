import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div
      className="flex gap-5 border-b backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        borderBottom: "1px solid var(--card-border)",
      }}
    >
      <button
        className="block lg:hidden"
        onClick={() => setOpenSideMenu(!openSideMenu)}
        style={{ color: "var(--text-color)" }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium">FinTrack: Your Personal Finance Tracker</h2>

      {openSideMenu && (
        <div
          className="fixed top-[61px] left-0 z-40"
          style={{
            backgroundColor: "var(--card-bg)",
            borderRight: "1px solid var(--card-border)",
          }}
        >
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
