import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-deployed-url.com",
];

// Configure CORS options
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin && allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies to be sent with requests (if needed)
};

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
