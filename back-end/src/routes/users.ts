import express from "express";
import { deleteAll, getDetail } from "../controllers/user";
import verifyJwt from "../utils/middlewares/verifyJwt";

const app = express.Router();

app.get("/", verifyJwt, getDetail);

app.delete("/all", deleteAll);

export default app;
