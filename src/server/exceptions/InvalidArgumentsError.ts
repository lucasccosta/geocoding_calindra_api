import { StatusCodes } from "http-status-codes";

export class InvalidArgumentsError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "Invalid Arguments Error";
    this.status = StatusCodes.BAD_REQUEST;
  }
}
