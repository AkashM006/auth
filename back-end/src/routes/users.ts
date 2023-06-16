import express from "express";
import { deleteAll } from "../controllers/user";

const app = express.Router();

app.delete("/all", deleteAll);

export default app;
