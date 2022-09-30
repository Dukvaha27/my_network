const { Router } = require("express");
const userControllers = require("../controllers/user.controllers");
const { authMiddleware } = require("../middlewares/register-middleware");

const [passwordValidate] = authMiddleware.registerValidate();
const checkToken = authMiddleware.checkToken;

const router = Router();

router.post(
  "/auth", userControllers.registration
);
router.post("/login", userControllers.login);
router.post("/logout", userControllers.logout);
router.get("/refresh", userControllers.refresh);
router.get("/activate/:link", userControllers.activateUser);
router.patch("/reset", userControllers.resetPassword);
router.get("/users",checkToken, userControllers.getUsers);

module.exports = router;
