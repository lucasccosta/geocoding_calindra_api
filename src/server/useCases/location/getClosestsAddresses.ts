import { Distances } from "../../domain/location/Distances";
import { AddressDistance } from "../../domain/location/valueObject/AddressDistance";
import { LocationFactories } from "../../factories/location/LocationFactories";
import { GeolocationService } from "../../shared/services/location/geolocation_service";

export class GetClosestsAddresses {
  private _locationService: GeolocationService;
  private _locationFactory: LocationFactories;

  constructor() {
    this._locationService = new GeolocationService();
    this._locationFactory = new LocationFactories();
  }

  async execute(addresses: Array<string>): Promise<{
    allDistances: Distances;
    shortestDistance: AddressDistance | undefined;
    longestDistance: AddressDistance | undefined;
  }> {
    const allLocations = await this._locationService.getAllLocations(addresses);
    const allDitancesBetweenLocations =
      await this._locationService.getDitancesBetweenLocations(allLocations);
    const allDistances = this._locationFactory.createDistances(
      allDitancesBetweenLocations
    );
    // distances calcula a distancia mais curta - pegar pelo value
    // console.log("distancias: ", allDistances.distances);
    const shortestDistance = allDistances.selectShortestDistance();
    // console.log("shortestDistance: ", shortestDistance);
    const longestDistance = allDistances.selectLongestDistance();
    // console.log("longestDistance: ", longestDistance);

    // console.log(
    //   `allDistances: ${allDistances} \n, shortest: ${shortestDistance} \n, longest: ${longestDistance}`
    // );
    // retorna a distancia mais proxima, distancia mais longa e todas as distancias
    return { allDistances, shortestDistance, longestDistance };
  }
}
