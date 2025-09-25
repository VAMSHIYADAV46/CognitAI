import mongoose from "mongoose";
import Thread from "./Models/Thread.js"; 
import { config } from "dotenv";

config(); // load .env variables

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function deleteAllThreads() {
    try {
        const result = await Thread.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} threads`);
    } catch (err) {
        console.error("❌ Error deleting threads:", err);
    } finally {
        mongoose.connection.close();
    }
}

deleteAllThreads();
