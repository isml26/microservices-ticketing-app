import Queue from "bull";

interface Payload {
  orderId: string;
}

const expiationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expiationQueue.process(async (job) => {
  console.log(
    "Publish and expration complete event for orderId",
    job.data.orderId
  );
});

export { expiationQueue };
