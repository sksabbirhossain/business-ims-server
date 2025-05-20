const stripe = require("../../../../configs/stripe");
const SubscriptionHistory = require("../../models/subscriptionHistorySchema");
const Store = require("../../../superAdmin/models/storeSchema");

//get banks with pagination
const getSubscriptions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const skip = (page - 1) * limit; // Calculate offset

    // Get total count
    const totalHistory = await SubscriptionHistory.countDocuments({
      storeInfo: req.store.storeId,
    });

    //get subscription history from database
    const history = await SubscriptionHistory.find({
      storeInfo: req.store.storeId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //send the response
    if (history && history.length >= 0) {
      res.json({
        data: history,
        total: totalHistory,
        currentPage: page,
        totalPages: Math.ceil(totalHistory / limit),
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

//create stripe payment
const stripePayment = async (req, res) => {
  try {
    const { paymentMethodId, planType, paymentMethod, postalCode, country } =
      req.body;

    const { storeId } = req.store;

    //find store
    const store = await Store.findById(storeId);
    if (!store)
      return res.status(404).json({
        errors: {
          common: {
            msg: "Store not found!",
          },
        },
      });

    const durationInMonths = planType === "monthly" ? 1 : 12;
    const paymentAmount = planType === "monthly" ? 500 : 5000; // example amounts

    // Calculate expiry
    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(now.getMonth() + durationInMonths);

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount * 100, // Stripe uses cents
      currency: "usd", // or bdt if your Stripe account supports it
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      metadata: {
        storeId,
        plan: planType,
      },
      shipping: {
        name: store.ownerName,
        address: {
          line1: store.address,
          postal_code: req.body.postalCode,
          country: req.body.country,
        },
      },
    });

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        errors: {
          common: {
            msg: "Payment failed!",
          },
        },
      });
    }

    // Save subscription history
    const subscription = await SubscriptionHistory.create({
      storeInfo: store._id,
      paymentAmount,
      plan: planType,
      paymentMethod,
      transactionId: paymentIntent.latest_charge,
      durationInMonths,
      expiryDate,
      status: "paid",
    });

    //Update Store subscription
    store.isActive = true;
    store.subscription = {
      plan: planType,
      startDate: now,
      endDate: expiryDate,
    };
    store.latestSubscription = subscription._id;
    await store.save();

    res.status(200).json({
      data: subscription,
      msg: "Payment successful!",
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
  getSubscriptions,
  stripePayment,
};
