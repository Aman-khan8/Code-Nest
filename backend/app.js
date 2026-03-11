import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/dbs/dbConenction.js";
import authRouter from "./src/routes/authRoute.js";
import errorHandler from "./src/middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
