import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import userRoute from "./routes/user.route.mjs";

connectDB();

const app = express();
const PORT = process.env.PORT || 3031;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute)

app.listen(PORT, () => console.log(`[server] running at port ${PORT}`));