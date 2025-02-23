const Stock = require("../../../models/storeAdmin/stockSchema");

//get all stock
const getStocks = async (req, res) => {
  try {
    //get category from database
    const stocks = await Stock.find({ storeInfo: req.store.storeId })
      .sort({ createdAt: 1 })
      .populate("supplierInfo");

    //send the response
    if (stocks && stocks.length >= 0) {
      res.json({
        data: stocks,
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
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

const getStock = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.stockId);
    res.status(200).json({ stock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create a stock
const createStock = async (req, res) => {
  try {
    //make user object
    const newStock = new Stock({
      ...req.body,
      picture: null,
      storeInfo: req.store?.storeId,
    });

    //save stock in database
    const stock = await newStock.save();

    //send the response
    if (stock && stock?._id) {
      res.json({
        data: stock,
        msg: "Stock was create successful!",
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
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

const updateStock = async (req, res) => {
  const { stockId: _id } = req.params;
  const stock = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No stock with that id");
  const updatedStock = await Stock.findByIdAndUpdate(
    _id,
    { ...stock, _id },
    { new: true }
  );
  res.json(updatedStock);
};

const deleteStock = async (req, res) => {
  const { stockId: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No stock with that id");
  await Stock.findByIdAndRemove(_id);
  res.json({ message: "Stock deleted successfully" });
};

module.exports = {
  getStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
};
