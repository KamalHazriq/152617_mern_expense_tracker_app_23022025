const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: { type: String },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    // Recurring logic
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurringType: {
      type: String,
      enum: [
        "",
        "daily",
        "weekly",
        "biweekly",
        "monthly",
        "semi-annually",
        "annually",
        "custom",
      ],
      default: "",
    },
    customDates: [
      {
        type: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
