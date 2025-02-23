const Stock = require("../../../models/storeAdmin/stockSchema");

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json({ stocks });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const createStock = async (req, res) => {
  const stock = req.body;
  const newStock = new Stock(stock);
  try {
    await newStock.save();
    res.status(201).json({ newStock });
  } catch (error) {
    res.status(409).json({ message: error.message });
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

module.exports = { getStocks, getStock, createStock, updateStock, deleteStock };
