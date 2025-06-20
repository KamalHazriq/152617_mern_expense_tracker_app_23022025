import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const isDark = document.documentElement.classList.contains("dark-mode");

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
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

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

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
