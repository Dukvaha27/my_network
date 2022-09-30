const jwt = require('jsonwebtoken');
const Token = require("../models/Token.model")

class TokenServices {
   generationTokens (payload) {
     const accessToken = jwt.sign(payload, process.env.SECRET_KEY,{
       expiresIn: "7d"
     });
     const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY,{
       expiresIn: "30d"
     });

     return { accessToken, refreshToken}
   }


   async saveToken (userID, refreshToken) {
     const tokenData = await Token.findOne({user:userID});
     if (tokenData) {
       tokenData.refreshToken = refreshToken

       return tokenData.save()
     }

     return await Token.create({user:userID,refreshToken});

   }
  async removeToken (refreshToken) {
     return await Token.deleteOne({refreshToken})
  }

  async findToken (refreshToken) {
    return await Token.findOne({refreshToken})
  }

  async validateAccessToken (token) {
     try {
       return await jwt.verify(token, process.env.SECRET_KEY);
     }catch (e){
       return null
     }
  }

  validateRefreshToken (token) {
    try {
      return jwt.verify(token, process.env.SECRET_REFRESH_KEY);
    }catch (e){
      return null
    }
  }
}

module.exports = new TokenServices();