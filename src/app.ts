import express, { Request, Response } from "express";

const port = 3000;

const app = express();
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
