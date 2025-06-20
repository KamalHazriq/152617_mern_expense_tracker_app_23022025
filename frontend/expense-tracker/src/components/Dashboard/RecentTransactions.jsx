import React from "react";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        border: "1px solid var(--card-border)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>

        <button
          onClick={onSeeMore}
          className="flex items-center gap-1 text-sm font-medium"
          style={{
            color: "var(--text-color)",
            border: "1px solid var(--card-border)",
            padding: "6px 10px",
            borderRadius: "6px",
            backgroundColor: "transparent",
          }}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
