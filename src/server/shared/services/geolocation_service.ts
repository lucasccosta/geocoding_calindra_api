import { Address } from "../../domain/valueObject/Address";
import { AddressDistance } from "../../domain/valueObject/AddressDistance";
import { DistanceBetween } from "../../domain/valueObject/DistanceBetween";
import { GeoLocationApi } from "../../integrations/geoLocationApi";

export class GeolocationService {
  private _api: GeoLocationApi;

  constructor() {
    this._api = new GeoLocationApi();
  }

  async getAllLocations(locations: Array<string>) {
    const allLocations: Array<Address> = [];
    for (const location of locations) {
      const fullLocation = await this._api.getLatAndLonByLocation(location);
      const address = new Address(location, fullLocation.lat, fullLocation.lng);
      allLocations.push(address);
    }
    return allLocations;
  }

  async getDitancesBetweenLocations(allLocations: Array<Address>) {
    const allDistances: Array<AddressDistance> = [];
    for (let firstIndex = 0; firstIndex < allLocations.length; firstIndex++) {
      for (
        let secondIndex = 1;
        secondIndex < allLocations.length;
        secondIndex++
      ) {
        if (allLocations[firstIndex] == allLocations[secondIndex]) continue;
        const distanceBetweenAddresses =
          await this._api.getDistanceBetweenAddresses(
            allLocations[firstIndex],
            allLocations[secondIndex]
          );
        const distance = new DistanceBetween(
          distanceBetweenAddresses.distance.text,
          distanceBetweenAddresses.distance.value,
          "distance"
        );
        const duration = new DistanceBetween(
          distanceBetweenAddresses.duration.text,
          distanceBetweenAddresses.duration.value,
          "duration"
        );
        const addressDistance = new AddressDistance(
          distance,
          duration,
          allLocations[firstIndex],
          allLocations[secondIndex]
        );
        allDistances.push(addressDistance);
      }
    }
    return allDistances;
  }
}
