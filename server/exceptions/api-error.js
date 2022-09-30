module.exports = class ApiError extends Error {
  status;
  message;
  errors;

  constructor(status, message, erros = []) {
    super(status);
    this.status = status;
    this.message = message;
    this.errors = erros;
  }
  static UnauthorizedError() {
    return new ApiError(401, 'Users unauthorized')
  }
  static BadRequest (message, errors = []) {
    return new ApiError(400, message, errors)
  }
};
