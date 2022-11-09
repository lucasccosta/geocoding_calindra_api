import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetClosestsAddresses } from "../../useCases/location/getClosestsAddresses";

interface Query {
  address: Array<string>;
}

export const getLocation = async (request: Request, response: Response) => {
  try {
    const { address } = request.query as unknown as Query;
    const useCase = new GetClosestsAddresses();
    const addressesResponse = await useCase.execute(address);
    return response.status(StatusCodes.OK).json(
      `A distancia mais curta é entre os endereços: ${
        addressesResponse.shortestDistance?.firstAddress.address
      } e ${
        addressesResponse.shortestDistance?.secondAddress.address
      }, com duração de ${addressesResponse.shortestDistance?.duration.text}

       A distancia mais longa é entre os endereços: ${
         addressesResponse.longestDistance?.firstAddress.address
       } e ${
        addressesResponse.longestDistance?.secondAddress.address
      }, com duração de ${addressesResponse.longestDistance?.duration.text}
      
      e a relação de endereços e suas distancias entre si: ${JSON.stringify(
        addressesResponse.allDistances.distances
      )}`
    );
  } catch (error) {
    if (error) {
      return response.status(StatusCodes.BAD_REQUEST);
    }
  }
};
