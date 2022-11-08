import { Address } from "./Address";
import { DistanceBetween } from "./DistanceBetween";

export class AddressDistance {
  private _distance: DistanceBetween;
  private _duration: DistanceBetween;
  private _firstAddress: Address;
  private _secondAddress: Address;

  constructor(
    distance: DistanceBetween,
    duration: DistanceBetween,
    firstAddress: Address,
    secondAddress: Address
  ) {
    this._distance = distance;
    this._duration = duration;
    this._firstAddress = firstAddress;
    this._secondAddress = secondAddress;
    this.validates();
  }

  get distance() {
    return this._distance;
  }

  get duration() {
    return this._duration;
  }
  get firstAddress() {
    return this._firstAddress;
  }

  get secondAddress() {
    return this._secondAddress;
  }

  validates() {
    if (this._distance === null || this._distance == undefined) {
      return new Error("Distance cannot be null or undefined");
    }
    if (this._duration === null || this._duration == undefined) {
      return new Error("Duration cannot be null or undefined");
    }
    if (this._firstAddress === null || this._firstAddress == undefined) {
      return new Error("First Address cannot be null or undefined");
    }
    if (this._secondAddress === null || this._secondAddress == undefined) {
      return new Error("Second Address cannot be null or undefined");
    }
  }
}
