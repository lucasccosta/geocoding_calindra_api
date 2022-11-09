export class InvalidArgumentsError extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "Invalid Arguments Error";
  }
}
