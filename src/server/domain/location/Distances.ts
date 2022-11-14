import { ValidationError } from "../../exceptions/ValidationError";
import { AddressDistance } from "./valueObject/AddressDistance";

export class Distances {
  private _distances: Array<AddressDistance>;

  constructor(distances: Array<AddressDistance>) {
    this._distances = distances;
    this.validates();
  }
  get distances() {
    return this._distances;
  }

  validates() {
    if (this.distances.length < 3) {
      throw new ValidationError("It must have at least three addresses");
    }
  }

  selectShortestDistance() {
    // Mapeia o array de distâncias, retornando o valor da duração da distância entre os endereços
    const travelDistanceCollection = this.getTravelDistanceBetweenAddress();

    // Seleciona a distância mais curta
    const shortestDistance = this.getShortestDistance(travelDistanceCollection);

    // Busca no array o endereço correspondente à distância mais curta
    return this.getAddressWithShortestDistance(shortestDistance);
  }

  selectLongestDistance() {
    // Mapeia o array de distâncias, retornando o valor da duração da distância entre os endereços
    const travelDistanceCollection = this.getTravelDistanceBetweenAddress();

    // Seleciona a distância mais longa
    const longestDistance = this.getLongestDistance(travelDistanceCollection);

    // Busca no array o endereço correspondente à distância mais longa
    return this.getAddressWithLongestDistance(longestDistance);
  }

  private getTravelDistanceBetweenAddress() {
    const travelDistanceCollection: Array<number> = [];
    this._distances.map((addresses) => {
      travelDistanceCollection.push(addresses.distance.value);
    });
    return travelDistanceCollection;
  }

  private getShortestDistance(travelDistanceCollection: Array<number>) {
    return Math.min(...travelDistanceCollection);
  }

  private getLongestDistance(travelDistanceCollection: Array<number>) {
    return Math.max(...travelDistanceCollection);
  }

  private getAddressWithShortestDistance(shortestDistance: number) {
    return this._distances.find(
      (addressDistance) => addressDistance.distance.value === shortestDistance
    );
  }

  private getAddressWithLongestDistance(longestDistance: number) {
    return this._distances.find(
      (addressDistance) => addressDistance.distance.value === longestDistance
    );
  }
}
