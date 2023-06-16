import express from "express";
import { RequestErrorHandler } from "../utils/Errors/ErrorHandler";
import { getSecret } from "../controllers/secret";
import verifyJwt from "../utils/middlewares/verifyJwt";

const app = express();

app.get("/", verifyJwt, RequestErrorHandler(getSecret));

export default app;
