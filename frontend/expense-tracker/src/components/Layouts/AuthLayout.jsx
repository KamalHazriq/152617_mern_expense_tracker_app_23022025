import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="flex"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        minHeight: "100vh",
      }}
    >
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium">FinTrack: Your Personal Finance Tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        <img
          src={CARD_2}
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"
          alt="Finance Illustration"
        />
      </div>
    </div>
  );
};

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className="flex gap-6 p-4 rounded-xl shadow-md z-10"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        border: "1px solid var(--card-border)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6
          className="text-xs mb-1"
          style={{ color: "var(--subtext-color)" }}
        >
          {label}
        </h6>
        <span className="text-[20px]">RM{value}</span>
      </div>
    </div>
  );
};

export default AuthLayout;
