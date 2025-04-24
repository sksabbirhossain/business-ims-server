const Employee = require("../../../models/storeAdmin/employeeSchema");

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

module.exports = { getEmployees, createEmployee };
