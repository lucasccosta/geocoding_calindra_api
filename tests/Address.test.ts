import { Address } from "../src/server/domain/location/valueObject/Address";

describe("Address unit tests", () => {
  it("should throw error when address is empty", () => {
    expect(() => {
      let address = new Address("", 22.30304, 34.939493);
    }).toThrowError("Address cannot be empty");
  });

  it("should throw error when latitude is lesser than -90 and greater than 90", () => {
    expect(() => {
      let address = new Address("Rua Lauro Müller, 116", -91, 34.939493);
    }).toThrowError("Latitude value variates between -90 to 90");
  });

  it("should throw error when is lesser than -180 and greater than 180", () => {
    expect(() => {
      let address = new Address("Rua Lauro Müller, 116", -22.43234, 91);
    });
  });
});
