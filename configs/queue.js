/*
 * Business-IMS Server — Inventory Management System API
 * Copyright (c) 2025 Sk Sabbir Hossain
 * Licensed under a custom license. Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims-server
 */
const IORedis = require("ioredis");

const redisConnection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  tls: process.env.REDIS_URL?.startsWith("rediss://") ? {} : undefined, // Use TLS if required
});

redisConnection.on("error", (err) => console.error("❌ Redis Error:", err));
redisConnection.on("connect", () => console.log("✅ Connected to Redis Cloud"));

const defaultQueueOptions = {
  delay: 1000,
  removeOnComplete: {
    age: 60 * 60 * 24,
  },
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000,
  },
};

module.exports = {
  redisConnection,
  defaultQueueOptions,
};
