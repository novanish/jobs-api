const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/CustomAPIError");

function errorHandler(err, req, res, next) {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.code === 11000) {
    const msg = `Duplicate Field Value Enter: ${Object.keys(err.keyValue)}`;
    return res.status(StatusCodes.BAD_REQUEST).json({ msg });
  }

  if (err.name === "CastError") {
    const msg = `Resource not found. Invalid: ${err.path}`;
    return res.status(StatusCodes.NOT_FOUND).json({ msg });
  }

  if (err.name === "ValidationError") {
    const msg = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");

    return res.status(StatusCodes.BAD_REQUEST).json({ msg });
  }

  console.error(err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, please try again" });
}

module.exports = errorHandler;
