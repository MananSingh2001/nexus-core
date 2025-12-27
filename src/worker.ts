import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Connect to the same Redis instance as the API
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

async function startWorker() {
  console.log("👷 Worker started. Waiting for audit logs...");

  while (true) {
    try {
      // BRPOP is a "Blocking" pop. It waits until a log exists in the queue.
      // '0' means wait indefinitely.
      const result = await redis.brpop("nexus_audit_queue", 0);

      if (result) {
        const [queueName, logData] = result;
        const log = JSON.parse(logData);

        // In a real SDE-2 project, you would save this to a DB or send an alert.
        console.log(
          `[PROCESSOR] Found log for user: ${log.userId} | Action: ${log.action}`
        );

        // Simulating processing time
        await new Promise((res) => setTimeout(res, 500));
      }
    } catch (err) {
      console.error("Worker Error:", err);
    }
  }
}

startWorker();
