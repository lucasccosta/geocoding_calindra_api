import { LocationFactories } from "../../factories/location/LocationFactories";
import { GeolocationService } from "../../shared/services/location/geolocation_service";

export class GetClosestsAddresses {
  private _locationService: GeolocationService;
  private _locationFactory: LocationFactories;

  constructor() {
    this._locationService = new GeolocationService();
    this._locationFactory = new LocationFactories();
  }

  async execute(addresses: Array<string>) {
    const allLocations = await this._locationService.getAllLocations(addresses);
    const allDitancesBetweenLocations =
      await this._locationService.getDitancesBetweenLocations(allLocations);
    const allDistances = this._locationFactory.createDistances(
      allDitancesBetweenLocations
    );
    const shortestDistance = allDistances.selectShortestDistance();
    const longestDistance = allDistances.selectLongestDistance();
    return { allDistances, shortestDistance, longestDistance };
  }
}
