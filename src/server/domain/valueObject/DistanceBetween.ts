export class DistanceBetween {
  _text: string;
  _value: number;
  _type: string;

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
