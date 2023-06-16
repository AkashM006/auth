import { CorsOptions } from "cors";

const allowedOrigins = ["http://localhost:5714"]; // The request from these domains are alone accepted by the server

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else
      callback(
        new Error(
          "Access to this resource is not allowed from the current origin."
        )
      );
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
