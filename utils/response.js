const response = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    status: {
      code: statusCode,
      message,
    },
    data,
  });
};

module.exports = response;
