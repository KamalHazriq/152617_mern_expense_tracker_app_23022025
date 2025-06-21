const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// Add Expense
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const { month, year } = req.query;
    let dateFilter = {};

    if (month) {
      const [y, m] = month.split("-");
      const start = new Date(`${y}-${m}-01T00:00:00.000Z`);
      const end = new Date(`${y}-${String(Number(m) + 1).padStart(2, "0")}-01T00:00:00.000Z`);
      dateFilter = { date: { $gte: start, $lt: end } };
    } else if (year) {
      const start = new Date(`${year}-01-01T00:00:00.000Z`);
      const end = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
      dateFilter = { date: { $gte: start, $lt: end } };
    }

    // Total Income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId, ...dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Total Expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId, ...dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Last 60 Days Income (unfiltered)
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Last 30 Days Expense (unfiltered)
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Last 5 Transactions (filtered)
    const lastTransactions = [
      ...(await Income.find({ userId, ...dateFilter }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "income" })
      ),
      ...(await Expense.find({ userId, ...dateFilter }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "expense" })
      ),
    ].sort((a, b) => b.date - a.date);

    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

