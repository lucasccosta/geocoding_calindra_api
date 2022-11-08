import { Distances } from "../../domain/location/Distances";
import { Address } from "../../domain/location/valueObject/Address";
import { AddressDistance } from "../../domain/location/valueObject/AddressDistance";
import { DistanceBetween } from "../../domain/location/valueObject/DistanceBetween";

export class LocationFactories {
  createAddress(address: string, latitude: number, longitude: number) {
    return new Address(address, latitude, longitude);
  }

  createDistances(distances: Array<AddressDistance>) {
    return new Distances(distances);
  }

  createDistanceBetween(text: string, value: number, type: string) {
    return new DistanceBetween(text, value, type);
  }

  createAddressDistance(
    distance: DistanceBetween,
    duration: DistanceBetween,
    firstAddress: Address,
    secondAddress: Address
  ) {
    return new AddressDistance(distance, duration, firstAddress, secondAddress);
  }
}
