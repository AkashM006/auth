import rateLimit from "express-rate-limit";
import logger from "../logger";

const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests. Please try again later.",
  handler: (req, res, next, options) => {
    // todo: log which user has exceeded the limited rate
    res.status(options.statusCode).send({
      msg: options.message,
    });
  },
});

export default loginRateLimiter;
