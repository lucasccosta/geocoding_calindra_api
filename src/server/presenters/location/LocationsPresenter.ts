import { Distances } from "../../domain/location/Distances";

export class LocationsPresenter {
  private _addresses: Distances;

  constructor(addresses: Distances) {
    this._addresses = addresses;
  }

  private distancesTranslated() {
    return this._addresses.distances.map((distance, index) => {
      return `
        Distância ${index + 1}:
        Primeiro endereço: ${distance.firstAddress.address},
        Segundo endereço: ${distance.secondAddress.address},
        Distância entre eles: ${distance.distance.text}
      `;
    });
  }

  apiResponse() {
    return `A distância mais curta é entre os endereços: ${
      this._addresses.selectShortestDistance()?.firstAddress.address
    } e ${
      this._addresses.selectShortestDistance()?.secondAddress.address
    }, com duração de ${this._addresses.selectShortestDistance()?.distance.text}
  
         A distância mais longa é entre os endereços: ${
           this._addresses.selectLongestDistance()?.firstAddress.address
         } e ${
      this._addresses.selectLongestDistance()?.secondAddress.address
    }, com duração de ${this._addresses.selectLongestDistance()?.distance.text}
        
        e a relação de endereços e suas distâncias entre si: ${this.distancesTranslated()}`;
  }
}
