import axios from "axios";
import { Address } from "../domain/valueObject/Address";

const BASE_URL = "https://api.geoapify.com/v1/geocode";
const LAT_PARAMETER = "7C";
const LNG_PARAMETER = "2C";

export class GeoLocationApi {
  async getLatAndLonByLocation(address: string) {
    try {
      // const location = "1600+Amphitheatre+Parkway,+Mountain+View,+CA&";
      const response = await axios.get(
        `${BASE_URL}/geocode/json?address=${address}&key=AIzaSyCsrPjQEjemeQAynjBRfgq1-OgKJChS_dA`
      );

      const { location } = response.data.results[0].geometry;
      return location;
    } catch (error) {
      console.log(error);
    }
  }

  async getDistanceBetweenAddresses(
    firstAddress: Address,
    secondAddress: Address
  ) {
    try {
      const response = await axios.get(
        // `${BASE_URL}/search?text=${location}&apiKey=68203bcb66da4ca6902865d0bea5337c`
        `${BASE_URL}/distancematrix/json?origins=${firstAddress.lat}%${LNG_PARAMETER}${firstAddress.lng}&destinations=${secondAddress.lat}%${LNG_PARAMETER}${secondAddress.lng}&key=AIzaSyCsrPjQEjemeQAynjBRfgq1-OgKJChS_dA`
      );

      const elements = response.data.rows[0].elements[0];
      return elements;
    } catch (error) {
      console.log(error);
    }
  }
}
