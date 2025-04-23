const mongoose = require("mongoose");

const SalaryHistorySchema = new mongoose.Schema({
  month: {
    type: String, // Example: 'April 2025'
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
});

const employeeSchema = new mongoose.Schema(
  {
    storeInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    monthlySalary: {
      type: Number,
      required: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    picture: String,
    picture_info: {
      public_key: String,
    },
    salaryHistory: [SalaryHistorySchema],
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
