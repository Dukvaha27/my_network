const { body } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token.services");

module.exports.authMiddleware = {
  registerValidate: () => {
    const emailValidate = body("email").isEmail();
    const passwordValidate = body("password").isLength({ min: 2, max: 16 });

    return [emailValidate, passwordValidate];
  },
  checkToken: (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) return next(ApiError.UnauthorizedError());
      const [, accessToken] = authorization.split(".");

      if (!accessToken) return next(ApiError.UnauthorizedError());
      const userData = tokenService.validateAccessToken(accessToken);

      if (!userData) return next(ApiError.UnauthorizedError());

      req.user = userData;
      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  },
};
