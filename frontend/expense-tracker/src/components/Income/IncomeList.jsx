import React from "react";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";
import { LuDownload } from "react-icons/lu";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        border: "1px solid var(--card-border)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Income Sources</h5>

        <button
          onClick={onDownload}
          style={{
            backgroundColor: "transparent",
            border: "1px solid var(--card-border)",
            color: "var(--text-color)",
            padding: "6px 10px",
            fontSize: "14px",
            borderRadius: "6px",
          }}
        >
          <LuDownload className="text-base inline mr-1" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
