const { Queue, Worker } = require("bullmq");
const { redisConnection, defaultQueueOptions } = require("../configs/queue");
const Stock = require("../models/storeAdmin/stockSchema");

//define queue name
const addStockQueueName = "addStock-queue";

//create a queue
const addStockQueue = new Queue(addStockQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueOptions,
});

//create worker
const AddStockQueuehandler = new Worker(
  addStockQueueName,
  async (job) => {
    //   filter data
    const { _id, createdAt, updatedAt, ...filteredData } = job.data;
    //add stock in database
    const addStock = new Stock({
      ...filteredData,
    });
    await addStock.save();
  },
  {
    connection: redisConnection,
  }
);

//worker listenner

// is complelted
AddStockQueuehandler.on("completed", (job) => {
  console.log(`this job is completed id-> ${job.id}`);
});

// is failed
AddStockQueuehandler.on("failed", (job) => {
  console.log(`this job is failed id-> ${job.id}`);
});

module.exports = {
  addStockQueueName,
  addStockQueue,
};
