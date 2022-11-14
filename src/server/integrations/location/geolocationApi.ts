import axios from "axios";
import { Address } from "../../domain/location/valueObject/Address";
import { ApiConnectionError } from "../../exceptions/ApiConnectionError";
import { InvalidArgumentsError } from "../../exceptions/InvalidArgumentsError";

// pôr .env
const BASE_URL = "https://maps.googleapis.com/maps/api";
const LAT_PARAMETER = "7C";
const LNG_PARAMETER = "2C";

export class GeolocationApi {
  async getLatAndLonByLocation(address: string) {
    try {
      const response = await axios.get(
        `${BASE_URL}/geocode/json?address=${address}&key=${process.env.API_KEY}`
      );

      const { location } = response.data.results[0].geometry;
      return location;
    } catch (error: any) {
      throw new ApiConnectionError(
        "Unable to connect to the external service, please try again later"
      );
    }
  }

  async getDistanceBetweenAddresses(
    firstAddress: Address,
    secondAddress: Address
  ) {
    try {
      const response = await axios.get(
        `${BASE_URL}/distancematrix/json?origins=${firstAddress.lat}%${LNG_PARAMETER}${firstAddress.lng}&destinations=${secondAddress.lat}%${LNG_PARAMETER}${secondAddress.lng}&key=${process.env.API_KEY}`
      );

      const elements = response.data.rows[0].elements[0];
      return elements;
    } catch (error: any) {
      throw new InvalidArgumentsError("Method must contain two addresses");
    }
  }
}
