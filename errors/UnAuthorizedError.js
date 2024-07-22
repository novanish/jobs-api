const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class UnAuthorizedError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = UnAuthorizedError;
