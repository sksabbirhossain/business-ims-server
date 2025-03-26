const redisConnection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

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
