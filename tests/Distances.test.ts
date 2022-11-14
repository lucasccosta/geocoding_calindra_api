import { AddressDistance } from "../src/server/domain/location/valueObject/AddressDistance";
import { Address } from "../src/server/domain/location/valueObject/Address";
import { DistanceBetween } from "../src/server/domain/location/valueObject/DistanceBetween";
import { Distances } from "../src/server/domain/location/Distances";

describe("Distances unit tests", () => {
  let firstAddress: Address;
  let secondAddress: Address;
  let thirdAddress: Address;
  let distance1: DistanceBetween;
  let duration1: DistanceBetween;
  let distance2: DistanceBetween;
  let duration2: DistanceBetween;
  let distance3: DistanceBetween;
  let duration3: DistanceBetween;
  let distance4: DistanceBetween;
  let duration4: DistanceBetween;
  let addressDistance1: AddressDistance;
  let addressDistance2: AddressDistance;
  let addressDistance3: AddressDistance;
  let addressDistance4: AddressDistance;
  let distances: Distances;
  beforeEach(() => {
    // Addresses
    firstAddress = new Address(
      "Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003",
      -22.8973551,
      -43.1802782
    );
    secondAddress = new Address(
      "Praça Mal.Âncora, 122, Centro, Rio de Janeiro, RJ, 20021200",
      -22.9039608,
      -43.1703536
    );
    thirdAddress = new Address(
      "Av.Pres.Castelo Branco 35 Maracanã, Rio de Janeiro RJ, 20271 - 130",
      -22.9087726,
      -43.2379979
    );
    // Primeira distância
    distance1 = new DistanceBetween("5.8km", 5807, "distance");
    duration1 = new DistanceBetween("17 mins", 1012, "duration");
    // Segunda distância
    distance2 = new DistanceBetween("6.8km", 6822, "distance");
    duration2 = new DistanceBetween("14 mins", 834, "duration");

    // Terceira distância
    distance3 = new DistanceBetween("7.7 km", 7669, "distance");
    duration3 = new DistanceBetween("16 mins", 977, "duration");

    // Quarta distância
    distance4 = new DistanceBetween("12.0 km", 12035, "distance");
    duration4 = new DistanceBetween("23 mins", 1363, "duration");

    // Distancias entre os endereços
    addressDistance1 = new AddressDistance(
      distance1,
      duration1,
      firstAddress,
      secondAddress
    );
    addressDistance2 = new AddressDistance(
      distance2,
      duration2,
      firstAddress,
      thirdAddress
    );
    addressDistance3 = new AddressDistance(
      distance3,
      duration3,
      secondAddress,
      thirdAddress
    );
    addressDistance4 = new AddressDistance(
      distance4,
      duration4,
      thirdAddress,
      secondAddress
    );
    distances = new Distances([
      addressDistance1,
      addressDistance2,
      addressDistance3,
      addressDistance4,
    ]);
  });
  it("should throw error when distance is null or undefined", () => {
    expect(() => {
      let distances = new Distances([addressDistance1, addressDistance2]);
    }).toThrowError("It must have at least three addresses");
  });
  it("should return the shortest distance", () => {
    expect(distances.selectShortestDistance()).toBe(distances.distances[0]);
  });
  it("should return the longest distance", () => {
    expect(distances.selectLongestDistance()).toBe(distances.distances[3]);
  });

  it("should return the distance with the lowest value", () => {
    const travelDistanceCollection: Array<number> = [];
    distances.distances.map((addresses) => {
      travelDistanceCollection.push(addresses.distance.value);
    });
    expect(distances["getShortestDistance"](travelDistanceCollection)).toBe(
      distance1.value
    );
  });

  it("should return the distance with the highest value", () => {
    const travelDistanceCollection: Array<number> = [];
    distances.distances.map((addresses) => {
      travelDistanceCollection.push(addresses.distance.value);
    });
    expect(distances["getLongestDistance"](travelDistanceCollection)).toBe(
      distance4.value
    );
  });

  it("should return the address with the shortest distance", () => {
    expect(distances["getAddressWithShortestDistance"](distance1.value)).toBe(
      addressDistance1
    );
  });

  it("should return the address with the longest distance", () => {
    expect(distances["getAddressWithLongestDistance"](distance4.value)).toBe(
      addressDistance4
    );
  });
});
