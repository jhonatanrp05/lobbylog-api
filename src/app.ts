import express, { Request, Response } from "express";
import userRoutes from "./routes/user.routes";

const port = 3000;

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
