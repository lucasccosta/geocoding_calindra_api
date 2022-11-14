import { InvalidArgumentsError } from "../../exceptions/InvalidArgumentsError";
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
    this.validates(addresses);
    const allLocations = await this._locationService.getAllLocations(addresses);
    const allDitancesBetweenLocations =
      await this._locationService.getDitancesBetweenLocations(allLocations);
    const allDistances = this._locationFactory.createDistances(
      allDitancesBetweenLocations
    );
    return allDistances;
  }

  validates(addresses: Array<string>) {
    if (addresses.length < 3 || addresses == undefined)
      throw new InvalidArgumentsError(
        "It must pass three or more address as argument"
      );
  }
}
