import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { printf, combine, timestamp } = winston.format;

const rotation: DailyRotateFile = new DailyRotateFile({
  filename: "app-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "30d",
  dirname: "logs",
});

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

var logger = winston.createLogger({
  level: "debug",
  transports: [rotation, new winston.transports.Console()],
  format: combine(timestamp({ format: "DD-MM-YYYY HH-mm-ss" }), logFormat),
});

export default logger;
