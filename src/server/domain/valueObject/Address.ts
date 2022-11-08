export class Address {
  private _address: string;
  private _lat: number;
  private _lng: number;

  constructor(address: string, lat: number, lng: number) {
    this._address = address;
    this._lat = lat;
    this._lng = lng;
    this.validates();
  }

  get address() {
    return this._address;
  }

  get lat() {
    return this._lat;
  }
  get lng() {
    return this._lng;
  }

  validates() {
    if (this._address.length === 0) {
      return new Error("Address cannot be empty");
    }
    if (this._lat <= 90 && this._lat >= -90) {
      return new Error("Latitude value variates between -90 to 90");
    }
    if (this._lng <= 180 && this._lng >= -180) {
      return new Error("Longitude value variates between -180 to 180");
    }
  }
}
