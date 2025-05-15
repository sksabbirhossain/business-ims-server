const stripe = require("../../../configs/stripe");
const SubscriptionHistory = require("../../../models/storeAdmin/subscriptionHistorySchema");
const Store = require("../../../models/superAdmin/stores/storeSchema");

//create stripe payment
const stripePayment = async (req, res) => {
  try {
    const { paymentMethodId, planType, paymentMethod } = req.body;

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
  stripePayment,
};
