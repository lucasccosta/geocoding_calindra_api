import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiConnectionError } from "../../exceptions/ApiConnectionError";
import { InvalidArgumentsError } from "../../exceptions/InvalidArgumentsError";
import { ValidationError } from "../../exceptions/ValidationError";
import { LocationsPresenter } from "../../presenters/location/LocationsPresenter";
import { GetClosestsAddresses } from "../../useCases/location/getClosestsAddresses";

interface Query {
  address: Array<string>;
}

export class LocationsController {
  async getDistances(request: Request, response: Response) {
    try {
      const { address } = request.query as unknown as Query;
      const useCase = new GetClosestsAddresses();
      const addresses = await useCase.execute(address);
      const presenter = new LocationsPresenter(addresses);

      return response.status(StatusCodes.OK).send(presenter.apiResponse());
    } catch (error) {
      if (error instanceof InvalidArgumentsError) {
        return response.status(error.status).json({ error: error.message });
      }
      if (error instanceof ApiConnectionError) {
        return response.status(error.status).json({ error: error.message });
      }
      if (error instanceof ValidationError) {
        return response.status(error.status).json({ error: error.message });
      }
      if (error instanceof Error) {
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: error.message });
      }
    }
  }
}
