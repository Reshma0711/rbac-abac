// utils/responseHandler.js
const handlerResponse = (res, status, message, data = null) => {
    res.status(status).json({
      status,
      message,
      data,
    });
  };
  
  module.exports = handlerResponse;
  

  