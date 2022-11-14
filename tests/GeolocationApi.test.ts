import { Address } from "../src/server/domain/location/valueObject/Address";
import { GeolocationApi } from "../src/server/integrations/location/geolocationApi";

describe("Geolocation Api unit tests", () => {
  it("should return an location object with latitude and longitude", async () => {
    const geolocationApi = new GeolocationApi();
    const address = "Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003";
    expect(await geolocationApi.getLatAndLonByLocation(address)).toStrictEqual({
      lat: -22.8973551,
      lng: -43.1802782,
    });
  });
  it("should return axios error", async () => {
    const geolocationApi = new GeolocationApi();
    const address = "";

    try {
      await geolocationApi.getLatAndLonByLocation(address);

      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.message).toBe(
        "Unable to connect to the external service, please try again later"
      );
    }
  });

  it("should return distance and duration", async () => {
    const geolocationApi = new GeolocationApi();
    const firstAddress = new Address(
      "Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003",
      -22.8973551,
      -43.1802782
    );
    const secondAddress = new Address(
      "Praça Mal.Âncora, 122, Centro, Rio de Janeiro, RJ, 20021200",
      -22.9039608,
      -43.1703536
    );
    expect(
      await geolocationApi.getDistanceBetweenAddresses(
        firstAddress,
        secondAddress
      )
    ).toStrictEqual({
      distance: { text: "5.8 km", value: 5807 },
      duration: { text: "17 mins", value: 1012 },
      status: "OK",
    });
  });

  it("should throw error", async () => {
    const geolocationApi = new GeolocationApi();
    const firstAddress = new Address(
      "Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003",
      -22.8973551,
      -43.1802782
    );
    try {
      // @ts-expect-error
      await geolocationApi.getDistanceBetweenAddresses(firstAddress);
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.message).toBe("Method must contain two addresses");
    }
  });
});
