import React from "react";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";
import { LuDownload } from "react-icons/lu";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
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
        <h5 className="text-lg font-semibold">All Expenses</h5>

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
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
