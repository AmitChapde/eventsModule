import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Events API is running"
  });
});

app.use("/api/events", eventRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;