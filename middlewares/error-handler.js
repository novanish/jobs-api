const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/CustomAPIError");

function errorHandler(err, req, res, next) {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, please try again" });
}

module.exports = errorHandler;
