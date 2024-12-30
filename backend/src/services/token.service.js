const jwt = require("jsonwebtoken");
const config = require("../config");
const crypto = require("crypto");
function hashPasswordWithSalt(password, saltVal) {
  if (!saltVal) {
    saltVal = crypto.randomBytes(16).toString("hex");
  }
  console.log("saltval", saltVal);
  const hashedPassword = crypto
    .pbkdf2Sync(password, saltVal, 1000, 64, "sha512")
    .toString("hex");
  return {
    password: hashedPassword,
    salt: saltVal,
  };
}
// create activation token
const createActivationToken = (user) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, config.ACTIVATION_SECRET, {
    expiresIn: "10d",
  });
};
const verifyActivationToken = (activation_token) => {
  return jwt.verify(activation_token, config.ACTIVATION_SECRET);
};

// create mail registration token
const createMailRegistrationToken = (mail) => {
  const { email } = mail;
  console.log(email);
  return jwt.sign({ email }, config.ACTIVATION_SECRET, {
    expiresIn: "10d",
  });
};
const verifyMailRegistrationToken = (activation_token) => {
  return jwt.verify(activation_token, config.ACTIVATION_SECRET);
};

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
  );
}
function createForgotPasswordToken(user) {
  const { id, email } = user;
  return jwt.sign({ id, email }, config.ACTIVATION_SECRET, {
    expiresIn: "10m", // set 10m
  });
}

const verifyForgotPasswordToken = (forgot_password_token) => {
  return jwt.verify(forgot_password_token, config.ACTIVATION_SECRET);
};

function refreshToken(data) {
  return jwt.sign(
    {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    },
    config.SECRET_REFRESH,
    {
      algorithm: "HS256",
      expiresIn: "365d",
    }
  );
}
function refreshTokenService(token) {
  const decoded = jwt.verify(token, config.SECRET_REFRESH);
  console.log("check", decoded.name);
  return jwt.sign(
    {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    },
    config.SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
  );
}
function getInfoFromToken(req) {
  try {
    const token =
      req.headers.authorization.split(" ").length == 2
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;
    const decode = jwt.verify(token, config.SECRET);
    return decode;
  } catch (e) {
    return false;
  }
}
function authorize(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    try {
      const decode = jwt.verify(authHeader.split(" ")[1], config.SECRET);
      console.log(Date.now() / 1000, decode.exp);
      if (Date.now() / 1000 < decode.exp) {
        next();
      } else {
        return res.status(401).json({ message: "Token is inspired" });
      }
    } catch (e) {
      console.log("checktoken", e);
      return res.status(401).json({ message: "Token not valid" });
    }
  } else return res.status(401).json({ message: "Not have permission" });
}
module.exports = {
  signToken,
  refreshToken,
  refreshTokenService,
  authorize,
  getInfoFromToken,
  hashPasswordWithSalt,
  createForgotPasswordToken,
  verifyForgotPasswordToken,
  createMailRegistrationToken,
  verifyMailRegistrationToken,
  createActivationToken,
  verifyActivationToken,
};
