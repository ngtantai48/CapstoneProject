const logger = require('../config/logger');
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).then(()=> logger.info(req.originalUrl)).catch((err) => next(err));
};

module.exports = catchAsync;
