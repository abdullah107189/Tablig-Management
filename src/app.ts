import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import config from "./config/index.js";
import router from "./app/routes/index.js";
const app: Application = express();

//---- Middleware ----
app.use(
  cors({
    origin: config.cors_origin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Root welcome route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Shebaghar API!",
    environment: config.node_dev,
    uptime: process.uptime().toFixed(2) + "sec",
    timeStamp: new Date().toISOString(),
  });
});
app.use("/api/v1", router);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
