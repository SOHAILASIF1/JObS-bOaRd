import mongoose from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  // Agar pehle se connection hai
  if (cached.conn) {
    console.log("🟢 Using cached MongoDB connection");
    return cached.conn;
  }

  // Agar connection promise nahi bani
  if (!cached.promise) {
    console.log("🟡 Connecting to MongoDB...");

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!)
      .then((mongoose) => {
        console.log("✅ MongoDB Connected Successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;

  // Cache ko global object mein save karo
  (global as any).mongoose = cached;

  return cached.conn;
}