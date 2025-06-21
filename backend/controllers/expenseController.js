const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Helper to generate recurring dates
const generateRecurringDates = (startDate, type, count = 12) => {
  const result = [];
  const start = new Date(startDate);

  for (let i = 0; i < count; i++) {
    const next = new Date(start);
    switch (type) {
      case "daily":
        next.setDate(start.getDate() + i);
        break;
      case "weekly":
        next.setDate(start.getDate() + i * 7);
        break;
      case "biweekly":
        next.setDate(start.getDate() + i * 14);
        break;
      case "monthly":
        next.setMonth(start.getMonth() + i);
        break;
      case "semi-annually":
        next.setMonth(start.getMonth() + i * 6);
        break;
      case "annually":
        next.setFullYear(start.getFullYear() + i);
        break;
      default:
        break;
    }
    result.push(next);
  }

  return result;
};

// Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const {
      icon,
      category,
      amount,
      date,
      isRecurring,
      recurringType,
      customDates,
      recurringCount,
    } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let expenseInstances = [];

    // Handle recurring logic
    if (isRecurring) {
      if (recurringType === "custom" && Array.isArray(customDates)) {
        // Custom recurrence
        expenseInstances = customDates.map((d) => ({
          userId,
          icon,
          category,
          amount,
          date: new Date(d),
          isRecurring,
          recurringType,
        }));
      } else {
        // Standard recurrence types: monthly, weekly, etc.
        const count = Number(recurringCount) || 6;
        const futureDates = generateRecurringDates(date, recurringType, count);
        expenseInstances = futureDates.map((d) => ({
          userId,
          icon,
          category,
          amount,
          date: d,
          isRecurring,
          recurringType,
        }));
      }
    } else {
      // One-time expense
      expenseInstances.push({
        userId,
        icon,
        category,
        amount,
        date: new Date(date),
        isRecurring: false,
      });
    }

    const savedExpenses = await Expense.insertMany(expenseInstances);
    res.status(200).json(savedExpenses);
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Download Expense Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
      Recurring: item.isRecurring ? item.recurringType : "No",
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
