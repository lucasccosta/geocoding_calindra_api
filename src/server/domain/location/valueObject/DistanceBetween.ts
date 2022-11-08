export class DistanceBetween {
  private _text: string;
  private _value: number;
  private _type: string;

  constructor(text: string, value: number, type: string) {
    this._text = text;
    this._value = value;
    this._type = type;
  }

  get text() {
    return this._text;
  }

  get value() {
    return this._value;
  }
}
