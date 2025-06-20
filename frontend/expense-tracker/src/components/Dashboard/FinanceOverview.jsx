import React from "react";
import CustomPieChart from "../charts/CustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

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
        <h5 className="text-lg font-semibold">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`RM${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
