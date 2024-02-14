import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import globalErrorHandler from "./middlewares/global.error.mjs"
import { CustomError } from "./utils/custom.error.mjs";
import userRoute from "./routes/user.route.mjs";
import jobRoute from "./routes/job.route.mjs";

connectDB();

const app = express();
const PORT = process.env.PORT || 3031;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute)
app.use("/api/jobs", jobRoute)

// NOT FOUND
app.all("*", (req, res, next) => {
    next(new CustomError("invalid route", 404))
})

app.use(globalErrorHandler)

app.listen(PORT, () => console.log(`[server] running at port ${PORT}`));