import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Leaderboard API is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
