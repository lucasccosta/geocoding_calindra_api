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
        const distance = this.distanceFactory(
          distanceBetweenAddresses.distance,
          "distance"
        );
        const duration = this.distanceFactory(
          distanceBetweenAddresses.duration,
          "duration"
        );
        const addressDistance = this.addressFactory(
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
  private distanceFactory(distancia: DistanceBetween, distanceType: string) {
    return new DistanceBetween(distancia.text, distancia.value, distanceType);
  }

  private addressFactory(
    distance: DistanceBetween,
    duration: DistanceBetween,
    firstAddress: Address,
    secondAddress: Address
  ) {
    return new AddressDistance(distance, duration, firstAddress, secondAddress);
  }
}
