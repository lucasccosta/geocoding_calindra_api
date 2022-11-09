import { ValidationError } from "../../../exceptions/ValidationError";

export class DistanceBetween {
  private _text: string;
  private _value: number;
  private _type: string;

  constructor(text: string, value: number, type: string) {
    this._text = text;
    this._value = value;
    this._type = type;
    this.validates();
  }

  get text() {
    return this._text;
  }

  get value() {
    return this._value;
  }

  validates() {
    if (this.text.length === 0) {
      throw new ValidationError("Text cannot be empty");
    }
    if (this.value < 0) {
      throw new ValidationError("Value must be positive");
    }
    if (this._type != "distance" && this._type != "duration") {
      throw new ValidationError(
        "Type must have 'distance' or 'duration' values"
      );
    }
  }
}
