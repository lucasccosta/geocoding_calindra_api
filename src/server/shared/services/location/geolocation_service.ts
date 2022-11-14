import { Address } from "../../../domain/location/valueObject/Address";
import { AddressDistance } from "../../../domain/location/valueObject/AddressDistance";
import { LocationFactories } from "../../../factories/location/LocationFactories";
import { GeolocationApi } from "../../../integrations/location/geolocationApi";

export class GeolocationService {
  private _api: GeolocationApi;
  private _LocationFactory: LocationFactories;

  constructor() {
    this._api = new GeolocationApi();
    this._LocationFactory = new LocationFactories();
  }

  async getAllLocations(locations: Array<string>) {
    const allLocations: Array<Address> = [];
    for (const location of locations) {
      const fullLocation = await this._api.getLatAndLonByLocation(location);
      const address = this._LocationFactory.createAddress(
        location,
        fullLocation.lat,
        fullLocation.lng
      );
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
        const distance = this._LocationFactory.createDistanceBetween(
          distanceBetweenAddresses.distance.text,
          distanceBetweenAddresses.distance.value,
          "distance"
        );
        const duration = this._LocationFactory.createDistanceBetween(
          distanceBetweenAddresses.duration.text,
          distanceBetweenAddresses.duration.value,
          "duration"
        );
        const addressDistance = this._LocationFactory.createAddressDistance(
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
