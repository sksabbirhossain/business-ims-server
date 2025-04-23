const Employee = require("../../../models/storeAdmin/employeeSchema");

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

module.exports = {
  createEmployee,
};
