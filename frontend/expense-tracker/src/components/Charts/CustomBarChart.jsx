import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const isDark = document.documentElement.classList.contains("dark-mode");

  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: isDark ? "#2e2e2e" : "#ffffff",
            color: isDark ? "#f0f0f0" : "#333333",
            border: "1px solid var(--card-border)",
            borderRadius: "8px",
            padding: "8px",
            fontSize: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ marginBottom: 4, fontWeight: "600", color: "#875cf5" }}>
            {payload[0].payload.category}
          </p>
          <p>
            Amount: <strong>RM{payload[0].payload.amount}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "var(--subtext-color)" }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--subtext-color)" }}
            stroke="none"
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8 }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
