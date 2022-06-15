export class AppException extends Error {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    super()
    this.message = message;
    this.statusCode = statusCode;
  }
}