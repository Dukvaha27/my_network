const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mail.services");
const TokenServices = require("./token.services");
const UserDto = require("../dtos/userDto");
const ApiError = require("../exceptions/api-error");
const generator = require("generate-password");

class UserServices {
  async registration(name, email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `User with this ${email} email address already exists`
      );
    }

    const hashPassword = await bcrypt.hash(password, 6);
    const activationLink = uuid.v4();

    // const fileNames = `${Math.floor(Math.random()*10000)}${img.name}`;

    // await img.mv(`./client/public/userImages/${fileNames}`,async err => {
    //   if (err){
    //     return ApiError(String(err))
    //   }else{
    //
    //   }
    // })

    const user = await User.create({
          // image:fileNames,
          name,
          email,
          password: hashPassword,
          activationLink,
        });

    const userDto = new UserDto(user);
    const link = `http://${process.env.API_URL}:${process.env.PORT}/activate/${activationLink}`;

    // await MailService.sendActivationMail(email, link);
    const tokens = TokenServices.generationTokens({ ...userDto });
    await TokenServices.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };

  }

  async resetPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(
        "The user with this email was not found in the database"
      );
    }
    const newPassword = generator.generate({ length: 9, numbers: true });
    const password = await bcrypt.hash(newPassword, 6);

    // await MailService.sendNewPasswordToMail(email, newPassword);
    const userDto = new UserDto(user);

    await User.findByIdAndUpdate(userDto.id, { password });
  }

  async activate(activateLink) {
    const user = await User.findOne({ activateLink });
    if (!user) {
      throw ApiError.BadRequest(
        "Invalid link, please make sure you are using the correct link."
      );
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User not found");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw ApiError.BadRequest("Invalid password");
    }

    const userDto = new UserDto(user);
    const tokens = TokenServices.generationTokens({ ...userDto });

    await TokenServices.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    return await TokenServices.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenServices.validateRefreshToken(refreshToken);
    const tokenFormDB = await TokenServices.findToken(refreshToken);
    if (!userData || !tokenFormDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findById(userData.id);

    const userDto = new UserDto(user);
    const tokens = TokenServices.generationTokens({ ...userDto });

    await TokenServices.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserServices();
