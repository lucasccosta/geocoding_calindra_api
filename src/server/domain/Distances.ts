import { AddressDistance } from "./valueObject/AddressDistance";

export class Distances {
  private _distances: Array<AddressDistance>;

  constructor(distances: Array<AddressDistance>) {
    this._distances = distances;
  }

  selectShortestDistance() {
    const mappedDistances: Array<number> = [];
    this._distances.map((addresses) => {
      mappedDistances.push(addresses.duration.value);
      return mappedDistances;
    });

    const shortestDistance = Math.min(...mappedDistances);

    this._distances.find(
      (addressDistance) => addressDistance.duration.value === shortestDistance
    );
  }
}
