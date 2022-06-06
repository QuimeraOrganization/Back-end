import { AppError } from "../errors/AppError.js";

export function ExceptionHandler(error, request, response, next) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal Server Error - ${error.message}`,
  });
}