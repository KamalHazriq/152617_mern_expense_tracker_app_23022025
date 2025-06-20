import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

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
        <div>
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--subtext-color)" }}
          >
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>

        <button
          onClick={onExpenseIncome}
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
            padding: "8px 14px",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "8px",
          }}
        >
          <LuPlus className="text-lg inline mr-1" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
