import express from "express";
import cors from "cors";
import connectDB from "./src/dbs/dbConenction.js";
import dotenv from "dotenv";
import authRouter from "./src/routes/authRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port:", process.env.PORT);
});
