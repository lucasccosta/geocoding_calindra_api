import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiConnectionError } from "../../exceptions/ApiConnectionError";
import { InvalidArgumentsError } from "../../exceptions/InvalidArgumentsError";
import { ValidationError } from "../../exceptions/ValidationError";
import { GetClosestsAddresses } from "../../useCases/location/getClosestsAddresses";

interface Query {
  address: Array<string>;
}

export class LocationsController {
  async getDistances(request: Request, response: Response) {
    try {
      const { address } = request.query as unknown as Query;
      console.log(address, address.length);
      if (address.length < 3 || address == undefined)
        throw new InvalidArgumentsError(
          "It must pass three or more address as argument"
        );
      const useCase = new GetClosestsAddresses();
      const addresses = await useCase.execute(address);
      return response.status(StatusCodes.OK).json(
        `A distancia mais curta é entre os endereços: ${
          addresses.shortestDistance?.firstAddress.address
        } e ${
          addresses.shortestDistance?.secondAddress.address
        }, com duração de ${addresses.shortestDistance?.duration.text}
  
         A distancia mais longa é entre os endereços: ${
           addresses.longestDistance?.firstAddress.address
         } e ${
          addresses.longestDistance?.secondAddress.address
        }, com duração de ${addresses.longestDistance?.duration.text}
        
        e a relação de endereços e suas distancias entre si: ${JSON.stringify(
          addresses.allDistances.distances
        )}`
      );
    } catch (error) {
      if (error instanceof InvalidArgumentsError) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
      if (error instanceof ApiConnectionError) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
      if (error instanceof ValidationError) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
      if (error instanceof Error) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
    }
  }
}
