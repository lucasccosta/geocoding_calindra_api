import { StatusCodes } from "http-status-codes";
export class ApiConnectionError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "Api Connection Error";
    this.status = StatusCodes.BAD_REQUEST;
  }
}
