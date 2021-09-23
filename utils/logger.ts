import winston from "winston";
import "winston-daily-rotate-file";

const transport = new winston.transports.DailyRotateFile({
  dirname: "logs",
  filename: "lottery-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
});

const logger = winston.createLogger({
  transports: [transport],
});

export const logI = (message: string) => {
  const dateMessage = `[${new Date().toISOString()}] ` + message;
  console.log(dateMessage);
  logger.info(dateMessage);
}

export const logE = (message: string) => {
  const dateMessage = `[${new Date().toISOString()}] ` + message;
  console.error(dateMessage);
  logger.error(dateMessage);
}

export default logger;
