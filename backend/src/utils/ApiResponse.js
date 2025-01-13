/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
exports.success = (message, data, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    data
  };
};

exports.successPagination = (message, data, statusCode, totalSize, page, limit) => {
  return {
    message,
    error: false,
    code: statusCode,
    data,
    page,
    limit,
    totalSize: totalSize
  };
};

