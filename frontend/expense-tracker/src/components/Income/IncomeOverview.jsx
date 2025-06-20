import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--subtext-color)" }}
          >
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button
          onClick={onAddIncome}
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
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
