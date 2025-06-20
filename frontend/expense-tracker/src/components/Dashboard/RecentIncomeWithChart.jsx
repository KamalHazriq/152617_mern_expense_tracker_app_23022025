import React, { useEffect, useState } from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

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
        <h5 className="text-lg font-semibold">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`RM${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
