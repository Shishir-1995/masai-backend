const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message });
  };
  
  module.exports = { errorHandler };
  
  // res.statusCode = 200
  // res.statusCode === 200 ? 500 : res.statusCode;
  // Condition ? [1] : [2]
  // Returns -> ?
  // condition ? expression_if_true : expression_if_false;
