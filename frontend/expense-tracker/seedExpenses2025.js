const mongoose = require("mongoose");
const Expense = require("./models/Expense");

const MONGODB_URI = "mongodb+srv://kamalhazriq:kamal123@financetrackerapp.texevli.mongodb.net/?retryWrites=true&w=majority&appName=financeTrackerApp"

const userId = "6854426ebfc3a7cc1da7fa7f"; // your target userId

const seedMonthlyExpenses = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const expenses = [];

    for (let month = 0; month < 12; month++) {
      const date = new Date(2025, month, 1); // 1st day of each month

      expenses.push({
        userId,
        icon: "💳",
        category: `Utility - ${date.toLocaleString("default", { month: "long" })}`,
        amount: 150 + month * 5, // just to vary amounts
        date,
        isRecurring: false,
      });
    }

    await Expense.insertMany(expenses);
    console.log("🌱 Inserted monthly expenses for 2025.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding expenses:", error);
    process.exit(1);
  }
};

seedMonthlyExpenses();
