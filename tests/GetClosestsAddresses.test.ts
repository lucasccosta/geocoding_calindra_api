import { Distances } from "../src/server/domain/location/Distances";
import { Address } from "../src/server/domain/location/valueObject/Address";
import { AddressDistance } from "../src/server/domain/location/valueObject/AddressDistance";
import { DistanceBetween } from "../src/server/domain/location/valueObject/DistanceBetween";
import { GetClosestsAddresses } from "../src/server/useCases/location/getClosestsAddresses";

describe("Use Case Get Closests Addresses unit tests", () => {
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
      "Praça Mal. Âncora, 122,Centro, Rio de Janeiro, RJ, 20021200",
      -22.9039608,
      -43.1703536
    );
    thirdAddress = new Address(
      "Av. Pres. Castelo Branco 35 Maracanã, Rio de Janeiro RJ, 20271-130",
      -22.9087726,
      -43.2379979
    );
    // Primeira distância
    distance1 = new DistanceBetween("5.8 km", 5807, "distance");
    duration1 = new DistanceBetween("17 mins", 1012, "duration");
    // Segunda distância
    distance2 = new DistanceBetween("6.8 km", 6822, "distance");
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

  it("should return the shortest distance", async () => {
    const addresses = [
      "Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003",
      "Praça Mal. Âncora, 122,Centro, Rio de Janeiro, RJ, 20021200",
      "Av. Pres. Castelo Branco 35 Maracanã, Rio de Janeiro RJ, 20271-130",
    ];
    const useCase = new GetClosestsAddresses();
    const response = await useCase.execute(addresses);
    expect(response).toEqual(distances);
  });
  it("should throw Invalid Arguments Error", async () => {
    const addresses = [
      "Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003",
      "Praça Mal. Âncora, 122,Centro, Rio de Janeiro, RJ, 20021200",
    ];
    const useCase = new GetClosestsAddresses();
    try {
      await useCase.execute(addresses);
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.message).toBe(
        "It must pass three or more address as argument"
      );
    }
  });
});
