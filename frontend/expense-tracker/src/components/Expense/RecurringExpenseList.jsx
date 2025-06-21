import React from "react";
import moment from "moment";

const getNextOccurrence = (startDate, type) => {
  if (!startDate || !type) return "-";

  let next = moment(startDate);
  while (next.isBefore(moment(), "day")) {
    switch (type) {
      case "daily": next.add(1, "days"); break;
      case "weekly": next.add(1, "weeks"); break;
      case "biweekly": next.add(2, "weeks"); break;
      case "monthly": next.add(1, "months"); break;
      case "semi-annually": next.add(6, "months"); break;
      case "annually": next.add(1, "years"); break;
      default: return "-";
    }
  }

  return next.format("YYYY-MM-DD");
};

// Deduplicate recurring expenses by group key
const deduplicateRecurringExpenses = (expenses = []) => {
  const map = new Map();

  expenses.forEach((e) => {
    const key = `${e.category}-${e.amount}-${e.recurringType}`;
    const existing = map.get(key);

    if (!existing || moment(e.date).isAfter(moment(existing.date))) {
      map.set(key, e); // keep the most recent date in the group
    }
  });

  return Array.from(map.values());
};


const RecurringExpenseList = ({ transactions = [] }) => {
  const recurring = transactions.filter((e) => e.isRecurring);
  const uniqueRecurring = deduplicateRecurringExpenses(recurring);

  if (!uniqueRecurring.length) return null;

  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        border: "1px solid var(--card-border)",
      }}
    >
      <h4 className="text-lg font-semibold mb-4">Recurring Expenses</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {uniqueRecurring.map((item) => (
          <div
            key={item._id}
            className="p-4 rounded-lg border"
            style={{
              border: "1px solid var(--card-border)",
              backgroundColor: "var(--card-bg)",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-semibold text-base">{item.category}</h5>
              {item.icon && <img src={item.icon} alt="icon" className="w-6 h-6" />}
            </div>

            <p className="text-sm mb-1">
              Amount: <strong>RM{item.amount}</strong>
            </p>
            <p className="text-sm mb-1">
              Frequency:{" "}
              <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {item.recurringType}
              </span>
            </p>
            <p className="text-sm mb-1">
              Start Date: {moment(item.date).format("YYYY-MM-DD")}
            </p>
            <p className="text-sm text-primary font-medium">
              Next Payment: {getNextOccurrence(item.date, item.recurringType)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecurringExpenseList;
