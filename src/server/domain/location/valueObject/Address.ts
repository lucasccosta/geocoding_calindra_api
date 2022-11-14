import { ValidationError } from "../../../exceptions/ValidationError";

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
      throw new ValidationError("Address cannot be empty");
    }
    if (this._lat > 90 || this._lat < -90) {
      throw new ValidationError("Latitude value variates between -90 to 90");
    }
    if (this._lng > 180 || this._lng < -180) {
      throw new ValidationError("Longitude value variates between -180 to 180");
    }
  }
}
