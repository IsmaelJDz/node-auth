export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  static unauthorized(message: string) {
    return new CustomError(401, message);
  }

  static notFound(message: string) {
    return new CustomError(404, message);
  }

  static internal(message: string) {
    return new CustomError(500, message);
  }

  static conflict(message: string) {
    return new CustomError(409, message);
  }

  static unprocessableEntity(message: string) {
    return new CustomError(422, message);
  }

  static tooManyRequests(message: string) {
    return new CustomError(429, message);
  }

  static serviceUnavailable(message: string) {
    return new CustomError(503, message);
  }

  static gatewayTimeout(message: string) {
    return new CustomError(504, message);
  }

  static custom(statusCode: number, message: string) {
    return new CustomError(statusCode, message);
  }

  static internalServerError(message: string = "Internal server error") {
    return new CustomError(500, message);
  }
}
