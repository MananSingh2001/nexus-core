import express from 'express';
import Redis from 'ioredis';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.use(express.json());

// SDE-2 Level: Define a strict schema for incoming logs
const AuditLogSchema = z.object({
  userId: z.string(),
  action: z.string(),
  resource: z.string(),
  timestamp: z.string().default(() => new Date().toISOString()),
});

app.post("/api/logs", async (req, res) => {
  try {
    const logData = AuditLogSchema.parse(req.body);

    // Pushing to Redis "List" (acts as a message queue)
    await redis.lpush("nexus_audit_queue", JSON.stringify(logData));

    // Return 202 (Accepted) - standard for async processing
    return res.status(202).json({ status: "Accepted", message: "Log queued" });
  } catch (error) {
    return res.status(400).json({ error: "Invalid log format" });
  }
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`🚀 Nexus-Core API running on port ${PORT}`)
);
