import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetClosestsAddresses } from "../../useCases/getClosestsAddresses";

export const getLocation = (request: Request, response: Response) => {
  try {
    const { addresses } = request.query;
    const useCase = new GetClosestsAddresses();
    useCase.execute(addresses);
    return response.status(StatusCodes.OK).json({});
  } catch (error) {
    if (error.algo) {
      return response.status(StatusCodes.BAD_REQUEST);
    }
  }
};
