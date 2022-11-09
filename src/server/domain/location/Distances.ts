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
    const travelDurationCollection = this.getTravelDurationBetweenAddress();

    // Seleciona a distância mais curta
    const shortestDistance = this.getShortestDistance(travelDurationCollection);

    // Busca no array o endereço correspondente à distância mais curta
    return this.getAddressWithShortestDistance(shortestDistance);
  }

  selectLongestDistance() {
    // Mapeia o array de distâncias, retornando o valor da duração da distância entre os endereços
    const travelDurationCollection = this.getTravelDurationBetweenAddress();

    // Seleciona a distância mais longa
    const longestDistance = this.getLongestDistance(travelDurationCollection);

    // Busca no array o endereço correspondente à distância mais longa
    return this.getAddressWithLongestDistance(longestDistance);
  }

  private getTravelDurationBetweenAddress() {
    const travelDurationCollection: Array<number> = [];
    this._distances.map((addresses) => {
      travelDurationCollection.push(addresses.duration.value);
    });
    return travelDurationCollection;
  }

  private getShortestDistance(travelDurationCollection: Array<number>) {
    return Math.min(...travelDurationCollection);
  }

  private getLongestDistance(travelDurationCollection: Array<number>) {
    return Math.max(...travelDurationCollection);
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
