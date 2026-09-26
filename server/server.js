import dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";
import connectDatabase from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();