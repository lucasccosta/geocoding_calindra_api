import { Distances } from "../domain/Distances";
import { AddressDistance } from "../domain/valueObject/AddressDistance";
import { GeolocationService } from "../shared/services/geolocation_service";

export class GetClosestsAddresses {
  private _locationService: GeolocationService;

  constructor() {
    this._locationService = new GeolocationService();
  }

  async execute(addresses: Array<string>): Promise<{
    allDistances: Distances;
    shortestDistance: AddressDistance | undefined;
    longestDistance: AddressDistance | undefined;
  }> {
    const allLocations = await this._locationService.getAllLocations(addresses);
    const allDitancesBetweenLocations =
      await this._locationService.getDitancesBetweenLocations(allLocations);
    const allDistances = new Distances(allDitancesBetweenLocations);
    // distances calcula a distancia mais curta - pegar pelo value
    console.log("distancias: ", allDistances.distances);
    const shortestDistance = allDistances.selectShortestDistance();
    console.log("shortestDistance: ", shortestDistance);
    const longestDistance = allDistances.selectLongestDistance();
    console.log("longestDistance: ", longestDistance);

    // console.log(
    //   `allDistances: ${allDistances} \n, shortest: ${shortestDistance} \n, longest: ${longestDistance}`
    // );
    // retorna a distancia mais proxima, distancia mais longa e todas as distancias
    return { allDistances, shortestDistance, longestDistance };
  }
}
