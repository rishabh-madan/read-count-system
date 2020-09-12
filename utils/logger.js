const appRoot = require("app-root-path");
const winston = require("winston");
require("winston-daily-rotate-file");

const errorTransport = new winston.transports.DailyRotateFile({
  filename: `${appRoot}/logs/errors-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  level: "error",
  json: true,
});

const infoTransport = new winston.transports.DailyRotateFile({
  filename: `${appRoot}/logs/info-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  level: "info",
  json: true,
});

const logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [errorTransport, infoTransport, new winston.transports.Console()],
  exitOnError: false,
});

// used by morgan pkg
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
