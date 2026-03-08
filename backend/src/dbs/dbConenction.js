import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `✅ MongoDB Connected! Host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error("❌ Connection to DB Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
