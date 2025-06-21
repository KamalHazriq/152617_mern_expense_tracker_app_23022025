import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import InfoCard from "../../components/cards/InfoCard";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";

const yearOptions = [2023, 2024, 2025];
const monthOptions = [
  { label: "All Months", value: "" },
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date();
const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
const currentYear = String(today.getFullYear());

const [selectedMonth, setSelectedMonth] = useState(currentMonth);
const [selectedYear, setSelectedYear] = useState(currentYear);


  const fetchDashboardData = async (year, month) => {
    if (loading) return;
    setLoading(true);

    try {
      const query =
        month && year ? `?month=${year}-${month}` : `?year=${year}`;
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}${query}`);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const monthFromURL = searchParams.get("month") || currentMonth;
    const yearFromURL = searchParams.get("year") || currentYear;

    setSelectedMonth(monthFromURL);
    setSelectedYear(yearFromURL);
    fetchDashboardData(yearFromURL, monthFromURL);
  }, []);

  useEffect(() => {
    setSearchParams({ month: selectedMonth, year: selectedYear });
    fetchDashboardData(selectedYear, selectedMonth);
  }, [selectedMonth, selectedYear]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-sm mb-1" style={{ color: "var(--text-color)" }}>
              Filter by Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 rounded-md border w-full md:w-48 text-sm"
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--text-color)",
                border: "1px solid var(--card-border)",
              }}
            >
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1" style={{ color: "var(--text-color)" }}>
              Filter by Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded-md border w-full md:w-32 text-sm"
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--text-color)",
                border: "1px solid var(--card-border)",
              }}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
