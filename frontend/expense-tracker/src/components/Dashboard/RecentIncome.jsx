import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
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
        <h5 className="text-lg font-semibold">Income</h5>

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
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
