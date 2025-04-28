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

//update a bank by id
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

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
};
