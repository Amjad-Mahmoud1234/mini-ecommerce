import { ZodError } from "zod";
import AppError from "../utils/appError.js";

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error("ERROR:", err);

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

const handleZodError = (err) => {
  const message =
    err.issues[0]?.message || "Invalid input";

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError(
    "Invalid token. Please log in again",
    401
  );

const handleJWTExpiredError = () =>
  new AppError(
    "Your token has expired. Please log in again",
    401
  );

const handlePrismaUniqueConstraintError = () =>
  new AppError(
    "Resource already exists",
    409
  );

const handlePrismaNotFoundError = () =>
  new AppError(
    "Resource not found",
    404
  );

export const globalErrorHandler = (
  err,
  req,
  res,
  next
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err instanceof ZodError) {
    err = handleZodError(err);
  }

  if (err.name === "JsonWebTokenError") {
    err = handleJWTError();
  }

  if (err.name === "TokenExpiredError") {
    err = handleJWTExpiredError();
  }

  if (err.code === "P2002") {
    err = handlePrismaUniqueConstraintError();
  }

  if (err.code === "P2025") {
    err = handlePrismaNotFoundError();
  }

  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  }

  return sendErrorProd(err, res);
};