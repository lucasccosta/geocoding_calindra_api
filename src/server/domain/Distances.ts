import { AddressDistance } from "./valueObject/AddressDistance";

export class Distances {
  private _distances: Array<AddressDistance>;

  constructor(distances: Array<AddressDistance>) {
    this._distances = distances;
  }
  get distances() {
    return this._distances;
  }

  selectShortestDistance() {
    const mappedDistances = this.mapDistances();

    const shortestDistance = this.getShortestDistance(mappedDistances);

    return this.getAddressWithShortestDistance(shortestDistance);
  }

  selectLongestDistance() {
    const mappedDistances = this.mapDistances();

    const longestDistance = this.getLongestDistance(mappedDistances);

    return this.getAddressWithLongestDistance(longestDistance);
  }

  private mapDistances() {
    const mappedDistances: Array<number> = [];
    this._distances.map((addresses) => {
      mappedDistances.push(addresses.duration.value);
    });
    return mappedDistances;
  }

  private getShortestDistance(mappedDistances: Array<number>) {
    return Math.min(...mappedDistances);
  }

  private getLongestDistance(mappedDistances: Array<number>) {
    return Math.max(...mappedDistances);
  }

  private getAddressWithShortestDistance(shortestDistance: number) {
    return this._distances.find(
      (addressDistance) => addressDistance.duration.value === shortestDistance
    );
  }

  private getAddressWithLongestDistance(shortestDistance: number) {
    return this._distances.find(
      (addressDistance) => addressDistance.duration.value === shortestDistance
    );
  }
}
