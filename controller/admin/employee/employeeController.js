const Employee = require("../../../models/storeAdmin/employeeSchema");
const Financial = require("../../../models/storeAdmin/financialSchema");

//get employee with pagination
const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalEmployee = await Employee.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get employee from database
    const employee = await Employee.find({ storeInfo: req.store.storeId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //send the response
    if (employee && employee.length >= 0) {
      res.json({
        data: employee,
        total: totalEmployee,
        currentPage: page,
        totalPages: Math.ceil(totalEmployee / limit),
        limit: limit,
      });
    } else {
      res.json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  } catch (err) {
    res.json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

//get a employee by id
const getEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params || {};
    //get employee from database
    const employee = await Employee.findOne({
      _id: employeeId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (employee && employee._id) {
      res.json({
        data: employee,
      });
    } else {
      res.json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  } catch (err) {
    res.json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

//create employee
const createEmployee = async (req, res) => {
  try {
    //make user object
    const newEmployee = new Employee({
      ...req.body,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save user in database
    const employee = await newEmployee.save();

    //send the response
    if (employee && employee._id) {
      res.json({
        data: employee,
        msg: "Employee was create successful!",
      });
    } else {
      res.json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  } catch (err) {
    res.json({
      errors: {
        common: {
          msg: err.message,
          //   msg: "internal server error"
        },
      },
    });
  }
};

//add employee salary by employeeId
const addEmployeeSalary = async (req, res) => {
  try {
    const { employeeId, month, amount } = req.body;

    if (!employeeId || !month || !amount) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "All fields are required!",
          },
        },
      });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Employee not found!",
          },
        },
      });
    }

    // Prevent duplicate month entry
    const alreadyPaid = employee.salaryHistory.find(
      (entry) => entry.month === month
    );
    if (alreadyPaid) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Salary for this month already paid!",
          },
        },
      });
    }

    // Add salary record
    employee.salaryHistory.push({
      month,
      amount,
    });

    await employee.save();

    // Update financial record
    const financial = await Financial.findOne({
      storeInfo: employee.storeInfo,
    });

    if (!financial) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Financial record not found for this store!",
          },
        },
      });
    }

    financial.totalExpenses += parseInt(amount);

    // Recalculate profit
    financial.totalProfit =
      financial.totalSalesRevenue -
      (financial.totalPurchaseCost + financial.totalExpenses);
    financial.lastUpdated = Date.now();

    await financial.save();

    res.status(200).json({
      data: employee,
      msg: "Salary added successfully",
    });
  } catch (err) {
    res.json({
      errors: {
        common: {
          msg: err.message,
          //   msg: "internal server error"
        },
      },
    });
  }
};

//update a employee by id
const updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params || {};

    //get employee from database
    const employee = await Employee.findOne({
      _id: employeeId,
      storeInfo: req.store.storeId,
    });

    // if employee not found
    if (!employee?._id) {
      return res.json({
        errors: {
          common: {
            msg: "employee was not found!",
          },
        },
      });
    }

    const updateData = req.body;

    // If an image is uploaded, add its path to updateData
    if (req.file) {
      updateData.picture = req.file.path;
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      {
        _id: employeeId,
        storeInfo: req.store.storeId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    //send the response
    if (updatedEmployee?._id) {
      res.json({
        data: updatedEmployee,
      });
    } else {
      res.json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  } catch (err) {
    // console.log(err);
    res.json({
      errors: {
        common: {
          // msg: err.message,
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

//delete a employee monthly salary by employee id
const deleteEmployeeSalary = async (req, res) => {
  try {
    const { employeeId, salaryId } = req.body;

    if (!employeeId || !salaryId) {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Employee ID and salary ID are required!",
          },
        },
      });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Employee not found!",
          },
        },
      });
    }

    // Find the salary entry for the month
    const salaryIndex = employee.salaryHistory.findIndex(
      (entry) => entry._id.toString() === salaryId
    );

    if (salaryIndex === -1) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Salary for this month not found!",
          },
        },
      });
    }

    // Extract and remove salary amount
    const removedSalary = employee.salaryHistory[salaryIndex];
    employee.salaryHistory.splice(salaryIndex, 1);
    await employee.save();

    // Update financial record
    const financial = await Financial.findOne({
      storeInfo: employee.storeInfo,
    });

    if (!financial) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Financial record not found for this store!",
          },
        },
      });
    }

    financial.totalExpenses -= removedSalary.amount;
    if (financial.totalExpenses < 0) financial.totalExpenses = 0; // Prevent negative

    financial.totalProfit =
      financial.totalSalesRevenue -
      (financial.totalPurchaseCost + financial.totalExpenses);
    financial.lastUpdated = Date.now();

    await financial.save();

    res.status(200).json({
      msg: "Salary deleted successfully",
      data: employee,
    });
  } catch (err) {
    // console.log(err)
    res.json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

//delete a employee by employee id
const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params || {};

    const deletedEmployee = await Employee.findByIdAndDelete({
      _id: employeeId,
      storeInfo: req.store.storeId,
    });

    //send the response
    if (deletedEmployee) {
      res.status(200).json({
        status: 200,
        msg: "Employee deleted successful!",
      });
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: "Unknown error occured!",
          },
        },
      });
    }
  } catch (err) {
    // console.log(err)
    res.json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  addEmployeeSalary,
  updateEmployee,
  deleteEmployeeSalary,
  deleteEmployee,
};
