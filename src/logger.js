const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: './log/error.log', level: 'error' }),
    new winston.transports.File({ filename: './log/info.log', level: 'info' }),
    new winston.transports.Console(),
  ],
});
module.exports = logger;