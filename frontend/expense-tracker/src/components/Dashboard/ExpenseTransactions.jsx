import moment from "moment";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
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
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Expenses</h5>

        <button
          className="flex items-center gap-1 text-sm font-medium"
          style={{
            color: "var(--text-color)",
            border: "1px solid var(--card-border)",
            padding: "6px 10px",
            borderRadius: "6px",
            backgroundColor: "transparent",
          }}
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
