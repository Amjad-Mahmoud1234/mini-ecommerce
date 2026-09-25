import prisma from "../config/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/token.js";

export const protect = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError("You are not logged in", 401)
    );
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyAccessToken(token);

  const user = await prisma.user.findUnique({
    where: {
      id: Number(decoded.sub),
    },
    select: {
      id: true,
      email: true,
    },
  });

  if (!user) {
    return next(
      new AppError("User no longer exists", 401)
    );
  }

  req.user = user;

  next();
});