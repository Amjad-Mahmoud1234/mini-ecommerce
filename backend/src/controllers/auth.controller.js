import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import {
  authenticateUser,
  findUserById,
} from "../services/auth.service.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("Email and password are required", 400)
    );
  }

  const user = await authenticateUser(email, password);

  if (!user) {
    return next(
      new AppError("Invalid email or password", 401)
    );
  }

  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken,
    },
  });
});

export const refresh = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return next(
      new AppError("Refresh token is required", 401)
    );
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await findUserById(decoded.sub);

  if (!user) {
    return next(
      new AppError("User no longer exists", 401)
    );
  }

  const accessToken = createAccessToken(user.id);

  res.status(200).json({
    status: "success",
    data: {
      accessToken,
    },
  });
});

export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};