const TokenService = require("./token.service");
const UserController = require("../controllers/user.Controller");
const mailService = require("./mailService");
const dotenv = require("dotenv");
const { resetPasswordEmailTemplate } = require("../utils/EmailTemplates");
const { DEFAULT_AVATAR, SMTP_MAIL, APP_NAME } = require("../config");
dotenv.config();
const { generateUUID } = require("../utils/uuid");
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await UserController.getUserByEmail(email);
  if (!user) {
    return null;
  }
  const passwordHashed = TokenService.hashPasswordWithSalt(
    password,
    process.env.SALT
  );
  if (user.password == passwordHashed.password) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      isVerified: user.isVerified,
    };
  }
};
const resetPassword = async (id, currentPassword, password) => {
  try {
    const user = await UserController.getUserById(id);
    if (!user) {
      return null;
    }

    const passwordHashed = TokenService.hashPasswordWithSalt(
      currentPassword,
      process.env.SALT
    );

    if (user.password !== passwordHashed.password)
      throw new Error("Your current password not match, please try again!");
    const hashedNewPassword = TokenService.hashPasswordWithSalt(
      password,
      process.env.SALT
    );
    user.password = hashedNewPassword.password;
    user.isVerified = true;
    const updatedUser = await UserController.updateUser(user.id, user);
    return updatedUser;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};
const forgotPassWord = async (email) => {
  try {
    const user = await UserController.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const token = TokenService.createForgotPasswordToken(user);
    const forgotPasswordUrl = `${process.env.HOST_FE}/auth/forgot-password/${token}`;
    console.log(token);
    const mailOptions = {
      emailFrom: SMTP_MAIL,
      emailTo: user.email,
      subject: `Forgot password in ${APP_NAME} - Please confirm your forgot password`,
      html: resetPasswordEmailTemplate(user.name, forgotPasswordUrl),
    };
    const mail = await mailService.sendEmail(mailOptions);
    // user.isVerified = "true";
    const updatedUser = await UserController.updateUser(user.id, user);
    return mail, updatedUser;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

const register = async (user) => {
  try {
    const hashedPassword = TokenService.hashPasswordWithSalt(
      user.password,
      process.env.SALT
    );
    user.password = hashedPassword.password;
    user.id = generateUUID();
    await UserController.createUser(user);
    return user;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

const updateUserInfo = async (id, user) => {
  try {
    const updatedUser = await UserController.updateUser(id, user);
    return updatedUser;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};
const deleteUser = async (id) => {
  try {
    const deletedUser = await UserController.deleteUser(id);
    return deletedUser;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};
const updateForgotPassword = async (email, password) => {
  try {
    const user = await UserController.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const hashedNewPassword = TokenService.hashPasswordWithSalt(
      password,
      process.env.SALT
    );
    user.password = hashedNewPassword.password;
    user.isVerified = true;
    const updatedUser = await UserController.updateUser(user.id, user);
    return updatedUser;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};
module.exports = {
  loginUserWithEmailAndPassword,
  register,
  updateUserInfo,
  deleteUser,
  forgotPassWord,
  resetPassword,
  updateForgotPassword,
};
