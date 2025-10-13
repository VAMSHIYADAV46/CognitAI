// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import path from "path";
// import { fileURLToPath } from "url";

// import ChatRoutes from "./Routes/Chats.js";

// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());

// // ✅ CORS: allow your frontend domain
// const allowedOrigins = [
//   "https://cognitai.onrender.com", //  deployed frontend
//   "http://localhost:5173"           // for local dev
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true
// }));

// // API routes
// app.use("/api", ChatRoutes);

// // MongoDB connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log("✅ Database Connected Successfully");
//   } catch (err) {
//     console.error("❌ Error connecting to DB:", err.message);
//     process.exit(1);
//   }
// };

// // Serve frontend build
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "../Frontend/dist"))); // Vite build

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
// });

// // Start server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port: ${PORT}`);
//   connectDB();
// });






import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import ChatRoutes from "./Routes/Chats.js";
import Thread from "./Models/Thread.js"; 

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// ✅ CORS: allow your frontend domain
const allowedOrigins = [
  "https://cognitai.onrender.com", // deployed frontend
  "http://localhost:5173"           // local dev
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// API routes
app.use("/api", ChatRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Database Connected Successfully");

    // ✅ Delete all threads every time the server starts
    const result = await Thread.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} threads on startup`);

  } catch (err) {
    console.error("❌ Error connecting to DB:", err.message);
    process.exit(1);
  }
};

// Serve frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../Frontend/dist"))); 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port: ${PORT}`);
  await connectDB();
});
