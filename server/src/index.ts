import express, { Request, Response } from "express";
import proxy from "express-http-proxy";

const app = express();
const port = process.env.PORT || 4000;
const userSvc = proxy("http://localhost:4001");
const processSvc = proxy("http://localhost:4002");
const offerSvc = proxy("http://localhost:4003");

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.use("/api/user", userSvc);
app.use("/api/process", processSvc);
app.use("/api/offer", offerSvc);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
