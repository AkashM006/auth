import express from "express";
import dotenv from "dotenv";
import { default as router } from "./routes/index";
import cors from "cors";
import corsOptions from "./utils/cors/allowedOrigin";
import errorHandler from "./utils/Errors/ErrorHandler";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening to PORT ${PORT}`);
});
