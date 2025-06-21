import React, { useState, useEffect } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

// Utility to generate preview dates
const generateRecurringDates = (startDate, type, count = 5) => {
  const result = [];
  const start = new Date(startDate);

  for (let i = 0; i < count; i++) {
    const next = new Date(start);
    switch (type) {
      case "daily": next.setDate(start.getDate() + i); break;
      case "weekly": next.setDate(start.getDate() + i * 7); break;
      case "biweekly": next.setDate(start.getDate() + i * 14); break;
      case "monthly": next.setMonth(start.getMonth() + i); break;
      case "semi-annually": next.setMonth(start.getMonth() + i * 6); break;
      case "annually": next.setFullYear(start.getFullYear() + i); break;
      default: break;
    }
    result.push(next.toISOString().split("T")[0]);
  }

  return result;
};

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
    isRecurring: false,
    recurringType: "",
    recurringCount: 6,
    customDates: [""],
  });

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustomDateChange = (index, value) => {
    const newDates = [...expense.customDates];
    newDates[index] = value;
    handleChange("customDates", newDates);
  };

  const addCustomDateField = () => {
    handleChange("customDates", [...expense.customDates, ""]);
  };

  const removeCustomDateField = (index) => {
    const updated = [...expense.customDates];
    updated.splice(index, 1);
    handleChange("customDates", updated);
  };

  // Autofill custom if empty
  useEffect(() => {
    if (
      expense.isRecurring &&
      expense.recurringType === "custom" &&
      expense.customDates.length === 1 &&
      expense.customDates[0] === "" &&
      expense.date
    ) {
      const start = new Date(expense.date);
      const generated = Array.from({ length: 3 }).map((_, i) => {
        const d = new Date(start);
        d.setMonth(start.getMonth() + i);
        return d.toISOString().split("T")[0];
      });
      handleChange("customDates", generated);
    }
  }, [expense.recurringType]);

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc"
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Start Date"
        type="date"
      />

      {/* Recurring toggle */}
      <div className="mt-4 mb-2">
        <label className="text-sm font-medium" style={{ color: "var(--text-color)" }}>
          <input
            type="checkbox"
            checked={expense.isRecurring}
            onChange={() => handleChange("isRecurring", !expense.isRecurring)}
            className="mr-2"
          />
          This is a recurring expense
        </label>
      </div>

      {/* Recurring dropdown */}
      {expense.isRecurring && (
        <div className="mb-4">
          <label className="block text-sm mb-1" style={{ color: "var(--text-color)" }}>
            Recurrence Type
          </label>
          <select
            value={expense.recurringType}
            onChange={(e) => handleChange("recurringType", e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--text-color)",
              border: "1px solid var(--card-border)",
            }}
          >
            <option value="">Select recurrence</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
            <option value="semi-annually">Semi-Annually</option>
            <option value="annually">Annually</option>
            <option value="custom">Custom Dates</option>
          </select>
        </div>
      )}

      {/* Recurring count (except custom) */}
      {expense.isRecurring && expense.recurringType && expense.recurringType !== "custom" && (
        <Input
          value={expense.recurringCount}
          onChange={({ target }) => handleChange("recurringCount", Number(target.value))}
          label="Repeat how many times?"
          type="number"
          placeholder="e.g. 6"
        />
      )}

      {/* Custom Dates */}
      {expense.isRecurring && expense.recurringType === "custom" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
            Custom Dates
          </label>
          {expense.customDates.map((date, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="date"
                value={date}
                onChange={(e) => handleCustomDateChange(index, e.target.value)}
                className="px-3 py-2 rounded-md border text-sm w-full"
                style={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-color)",
                  border: "1px solid var(--card-border)",
                }}
              />
              {expense.customDates.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCustomDateField(index)}
                  className="text-sm text-red-500 font-semibold"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCustomDateField}
            className="mt-2 text-sm text-primary font-medium"
          >
            + Add Another Date
          </button>
        </div>
      )}

      {/* Preview */}
      {expense.isRecurring &&
        expense.recurringType &&
        expense.recurringType !== "custom" &&
        expense.date && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-color)" }}>
              Upcoming Recurring Dates:
            </label>
            <ul className="text-sm list-disc pl-5" style={{ color: "var(--subtext-color)" }}>
              {generateRecurringDates(expense.date, expense.recurringType, expense.recurringCount || 6).map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        )}

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => onAddExpense(expense)}
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            transition: "background-color 0.3s ease",
          }}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
