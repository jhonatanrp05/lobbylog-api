import express, { Request, Response } from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import packageRoutes from "./routes/package.routes";

const port = 3000;

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/packages", packageRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
