export class ApiConnectionError extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "Api Connection Error";
  }
}
