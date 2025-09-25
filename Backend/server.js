import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import ChatRoutes from "./Routes/Chats.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api", ChatRoutes);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Database Connected Successfully");
  } catch (err) {
    console.error("❌ Error While Connecting to database:", err.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

// ✅ Serve frontend (dist if Vite, build if CRA)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../Frontend/dist"))); // change to "../Frontend/build" if CRA

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html")); // or "../Frontend/build/index.html"
});

// Start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port: ${PORT}`);
  connectDB();
});
