import { StatusCodes } from "http-status-codes";
export class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "Validation Error";
    this.status = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}
