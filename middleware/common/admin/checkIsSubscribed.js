const Store = require("../../../models/superAdmin/stores/storeSchema");

const checkIsSubscribed = async (req, res, next) => {
  try {
    const storeId = req.store?.storeId;

    if (!storeId) {
      return res.status(403).json({
        errors: {
          common: {
            msg: "Store ID not found!",
          },
        },
        status: 403,
      });
    }

    const store = await Store.findById(storeId).lean();

    if (!store) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "Store not found!",
          },
        },
        status: 404,
      });
    }

    // Subscription Check Logic
    const currentDate = new Date();
    const expiryDate = new Date(store.subscription?.expiryDate);

    if (!store.isActive && (!store.subscription || expiryDate < currentDate)) {
      return res.status(403).json({
        errors: {
          common: {
            msg: "Your subscription has expired. Please renew to access this feature!",
          },
        },
        status: 403,
      });
    }

    // If everything is OK
    next();
  } catch (err) {
    return res.status(401).json({
      errors: {
        common: {
          msg: "Something went wrong!",
        },
      },
      status: 401,
    });
  }
};

module.exports = checkIsSubscribed;
