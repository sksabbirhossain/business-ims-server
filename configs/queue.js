const IORedis = require("ioredis");

const redisConnection = new IORedis({
  maxRetriesPerRequest: null,
  URL: process.env.REDIS_URL,
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
