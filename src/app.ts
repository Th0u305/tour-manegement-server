import express, { Application, Request, Response } from "express";
import cors from "cors";
import { customRouter } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use("/api/v1", customRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour management System Backend",
  });
});

app.use(globalErrorHandler);

app.use(notFound)

export default app;
