const userServices = require("../service/user.services");
const User = require("../models/User.model");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserControllers {
  async registration(req, res, next) {
    try {
      const error = validationResult(req);
      if (!error.isEmpty())
        return next(ApiError.BadRequest("Ошибка сервера", error.array()));
      const { name, email, password } = req.body;
      // const { img = '' } = req.files;
      const userData = await userServices.registration(name, email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async resetPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userServices.resetPassword(email);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userServices.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userServices.logout(refreshToken);

      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activateUser(req, res, next) {
    try {
      const activateLink = await req.params.link;
      await userServices.activate(activateLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userServices.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserControllers();
