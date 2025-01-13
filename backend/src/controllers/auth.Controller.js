const AuthServices = require("../services/auth.service");
const TokenService = require("../services/token.service");
const mailService = require("../services/mailService");
const UserController = require("./user.Controller");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const cloudinary = require("cloudinary");
const { verificationEmailTemplate } = require("../utils/EmailTemplates");
const httpStatus = require("http-status");
const { DEFAULT_AVATAR, SMTP_MAIL, APP_NAME } = require("../config");
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthServices.loginUserWithEmailAndPassword(
    email,
    password
  );
  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Email or password is not correct!"
    );
  }
  if (!user.isVerified) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please check your email and verify account!"
    );
  }
  const access_token = await TokenService.signToken(user);
  const refresh_token = await TokenService.refreshToken(user);
  res.send({
    data: {
      user: { ...user, avatar: JSON.parse(user.avatar) },
      access_token,
      refresh_token,
    },
    message: "Login success",
  });
});
const resetPassword = async (req, res) => {
  try {
    const { currentPassword, password } = req.body;
    const user = await AuthServices.resetPassword(
      req.user.id,
      currentPassword,
      password
    );
    if (!user) {
      res.status(400).json({
        message: "Change password failure, please check your current password",
      });
      return;
    }
    res.status(200).json({ message: "Change password success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
const forgotPassWord = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await AuthServices.forgotPassWord(email);
    if (!user) {
      res.status(400).json({ message: "Email not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Please check your email to reset password" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const updateForgotPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    const user_payload = TokenService.verifyForgotPasswordToken(token);

    if (!user_payload) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Your token is invalid!");
    }
    const { email } = user_payload;
    const user = await AuthServices.updateForgotPassword(email, password);
    if (!user) {
      res.status(400).json({ message: "Email not found" });
      return;
    }
    res.status(200).json({ message: "Update password success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    const newUser = await AuthServices.register({
      ...req.body,
      role: "user",
      avatar: {
        public_id: "",
        url: DEFAULT_AVATAR,
      },
    });

    const activationToken = TokenService.createActivationToken(newUser);
    const activationUrl = `${process.env.HOST}/api/v1/auth/activation/${activationToken}`;
    const mailOptions = {
      emailFrom: SMTP_MAIL,
      emailTo: newUser.email,
      subject: `Welcome to ${APP_NAME} - Please Verify Your Account`,
      text: `Click here to verify your account: ${activationUrl}`,
      html: verificationEmailTemplate(newUser.name, activationUrl),
    };
    await mailService.sendEmail(mailOptions);
    res.status(201).json({
      status: "Success",
      data: {
        name: newUser.name,
        email: newUser.email,
        id: newUser.id,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const registerCompany = catchAsync(async (req, res) => {
  let myCloud = null;
  const user = await UserController.getUserByEmail(req.body.email);
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, "Email is existed!");
  }
  const avatar = req.body?.avatar || null;
  if (avatar) {
    myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "datn/avatars",
    });
  }
  const avt = avatar
    ? {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
    : {
        public_id: "",
        url: DEFAULT_AVATAR,
      };
  const newUser = await AuthServices.register({
    ...req.body,
    role: "company",
    avatar: JSON.stringify(avt),
  });

  const activationToken = TokenService.createActivationToken(newUser);
  const activationUrl = `${process.env.HOST}/api/v1/auth/activation/${activationToken}`;
  const mailOptions = {
    emailFrom: SMTP_MAIL,
    emailTo: newUser.email,
    subject: `Welcome to ${APP_NAME} - Please Verify Your Account`,
    text: `Click here to verify your account: ${activationUrl}`,
    html: verificationEmailTemplate(newUser.name, activationUrl),
  };
  try {
    await mailService.sendEmail(mailOptions);
    return res.status(201).json({
      status: "Success",
      data: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        id: newUser.id,
        avatar: newUser.avatar,
        role: newUser.role,
      },
      message: "Please check your email to confirm account",
    });
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
});

const updateUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    console.log(user);
    const updatedUser = await AuthServices.updateUserInfo(id, user);
    res.status(201).json({
      status: "Success",
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await AuthServices.deleteUser(id);
    console.log(user);
    res.status(201).json({
      status: "Delete success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
const sendMail = async (req, res) => {
  const sendEmail = req.body;

  try {
    const mailOptions = {
      emailFrom: "vanthanhhuynhtk@gmail.com",
      emailTo: sendEmail.mailTo,
      subject: "Here is your job link",
      text: `Click here:${sendEmail.link}`,
    };
    try {
      await mailService.sendEmail(mailOptions);
      return res.status(201).send({ message: "Email sent successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: "Failed to send email" || "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.body.refresh_token;
    console.log(token);
    if (token) {
      const response = await TokenService.refreshTokenService(token);
      return res.status(201).json({
        access_token: response,
      });
    } else {
      return res
        .status(400)
        .json({ message: "The refresh token is not valid" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};

const activeAccount = catchAsync(async (req, res) => {
  const activation_token = req.params.token;
  const user_payload = TokenService.verifyActivationToken(activation_token);

  if (!user_payload) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Your token is invalid!");
  }
  const { id } = user_payload;

  let user = await UserController.getUserById(id);
  if (user.isVerified) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Your account has been verified before!"
    );
  }
  await UserController.updateUser(user.id, { isVerified: true });
  return res
    .status(200)
    .json({ message: "Your account is verify successfully!" });
});
module.exports = {
  login,
  register,
  registerCompany,
  updateUserInfo,
  deleteUser,
  sendMail,
  refreshToken,
  forgotPassWord,
  resetPassword,
  activeAccount,
  updateForgotPassword,
};
