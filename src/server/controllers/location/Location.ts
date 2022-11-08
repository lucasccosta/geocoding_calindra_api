import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetClosestsAddresses } from "../../useCases/getClosestsAddresses";

interface Query {
  address: Array<string>;
}

export const getLocation = async (request: Request, response: Response) => {
  try {
    const { address } = request.query as unknown as Query;
    const useCase = new GetClosestsAddresses();
    //     mudar nome
    const addressesResponse = await useCase.execute(address);
    return response
      .status(StatusCodes.OK)
      .json(
        `${addressesResponse.shortestDistance} ${addressesResponse.longestDistance}, ${addressesResponse.allDistances}`
      );
  } catch (error) {
    if (error) {
      return response.status(StatusCodes.BAD_REQUEST);
    }
  }
};
