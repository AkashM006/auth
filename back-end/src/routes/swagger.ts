import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../utils/swagger/swagger";

const app = express.Router();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/docs.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

export default app;
