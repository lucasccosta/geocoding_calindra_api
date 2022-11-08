import { Distances } from "../domain/Distances";
import { Address } from "../domain/valueObject/Address";
import { AddressDistance } from "../domain/valueObject/AddressDistance";
import { DistanceBetween } from "../domain/valueObject/DistanceBetween";
import { GeoLocationApi } from "../integrations/geoLocationApi";

export class GetClosestsAddresses {
  _api: GeoLocationApi;

  constructor() {
    this._api = new GeoLocationApi();
  }

  async execute(addresses: Array<string>) {
    const allLocations = await this.getAllLocations(addresses);
    const allDitancesBetweenLocations =
      this.getDitancesBetweenLocations(allLocations);
    const allDistances = new Distances(allDitancesBetweenLocations);
    // distances calcula a distancia mais curta - pegar pelo value
    allDistances.selectShortestDistance();

    // retorna a distancia e um to string com um textinho
  }

  // pôr num serviço

  async getAllLocations(locations: Array<string>) {
    const allLocations: Array<Address> = [];
    locations.map(async (location: string) => {
      const fullLocation = await this._api.getLatAndLonByLocation(location);
      const fullAddress = new Address(
        location,
        fullLocation.lat,
        fullLocation.lng
      );
      allLocations.push(fullAddress);
    });
    return allLocations;
  }

  async getDitancesBetweenLocations(allLocations: Array<Address>) {
    const allDistances: Array<AddressDistance> = [];
    for (let firstIndex = 0; firstIndex < allLocations.length; firstIndex++) {
      for (
        let secondIndex = 0;
        secondIndex < allLocations.length;
        secondIndex++
      ) {
        const distanceBetweenAddresses =
          await this._api.getDistanceBetweenAddresses(
            allLocations[firstIndex],
            allLocations[secondIndex]
          );
        const distance = {
          text: distanceBetweenAddresses.distance.text,
          value: distanceBetweenAddresses.distance.value,
        };
        // const duration = new DistanceBetween(
        //   distanceBetweenAddresses.duration.text,
        //   distanceBetweenAddresses.duration.value,
        //   "duration"
        // );
        const duration = {
          text: distanceBetweenAddresses.duration.text,
          value: distanceBetweenAddresses.duration.value,
        };
        const addressDistance = new AddressDistance(
          distance,
          duration,
          allLocations[firstIndex],
          allLocations[secondIndex]
        );
        allDistances.push(addressDistance);
      }
    }
  }
}
