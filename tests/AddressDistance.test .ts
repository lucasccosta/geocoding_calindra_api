import { AddressDistance } from "../src/server/domain/location/valueObject/AddressDistance";
import { Address } from "../src/server/domain/location/valueObject/Address";
import { DistanceBetween } from "../src/server/domain/location/valueObject/DistanceBetween";

describe("AddressDistance unit tests", () => {
  let distance: DistanceBetween;
  let duration: DistanceBetween;
  let firstAddress: Address;
  let secondAddress: Address;

  beforeEach(() => {
    distance = new DistanceBetween("13.2km", 1203, "distance");
    duration = new DistanceBetween("13.2km", 1203, "duration");
    firstAddress = new Address("Rua Lauro Müller, 116", -22.34454, 25.0043);
    secondAddress = new Address(
      "Rua Voluntários da Patria, 14",
      -30.34454,
      55.0043
    );
  });

  it("should throw error when distance is null or undefined", () => {
    expect(() => {
      let address = new AddressDistance(
        distance,
        duration,
        firstAddress,
        secondAddress
      );
    }).toThrowError("Distance cannot be null or undefined");
  });

  it("should throw error when duration is null or undefined", () => {
    expect(() => {
      let address = new AddressDistance(
        distance,
        distance,
        firstAddress,
        secondAddress
      );
    }).toThrowError("Duration cannot be null or undefined");
  });

  it("should throw error when First Address is null or undefined", () => {
    expect(() => {
      let address = new AddressDistance(
        distance,
        duration,
        distance,
        secondAddress
      );
    }).toThrowError("First Address cannot be null or undefined");
  });

  it("should throw error when second Address is null or undefined", () => {
    expect(() => {
      let address = new AddressDistance(
        distance,
        duration,
        firstAddress,
        distance
      );
    }).toThrowError("First Address cannot be null or undefined");
  });
});
