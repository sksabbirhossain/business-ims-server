const Purchase = require("../../../models/storeAdmin/purchaseSchema");
const Sales = require("../../../models/storeAdmin/salesSchema");

//get purchase and sales
const getPurchaseAndSales = async (req, res) => {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 12);

    // Fetch last 30 days of purchases
    const purchases = await Purchase.find({ createdAt: { $gte: last30Days } })
      .sort({ createdAt: 1 }) // Sort by ascending date
      .lean();

    // Fetch last 30 days of sales
    const sales = await Sales.find({ createdAt: { $gte: last30Days } })
      .sort({ createdAt: 1 }) // Sort by ascending date
      .lean();

    // Combine and format data by date
    const dataMap = new Map();

    // Process purchases
    purchases.forEach((p) => {
      const dateKey = p.createdAt.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
      if (!dataMap.has(dateKey)) {
        dataMap.set(dateKey, { createdAt: dateKey, Purchase: 0, Sale: 0 });
      }
      dataMap.get(dateKey).Purchase += p.purchasePrice; // Adjust field based on schema
    });

    // Process sales
    sales.forEach((s) => {
      const dateKey = s.createdAt.toISOString().split("T")[0];
      if (!dataMap.has(dateKey)) {
        dataMap.set(dateKey, { createdAt: dateKey, Purchase: 0, Sale: 0 });
      }
      dataMap.get(dateKey).Sale += s.totalPrice; // Adjust field based on schema
    });

    // Convert map to sorted array
    const combinedData = Array.from(dataMap.values()).sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    res.status(200).json({
      data: combinedData,
    });
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

module.exports = {
  getPurchaseAndSales,
};
