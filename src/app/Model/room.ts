export class Room {
  get capacity(): number {
    return this._capacity;
  }

  set capacity(value: number) {
    this._capacity = value;
  }
  constructor(number: number, capacity: number) {
    this._number = number;
    this._capacity = number;
  }
  set number(value: number) {
    this._number = value;
  }
  get number(): number {
    return this._number;
  }
  private _number: number;
  private _capacity: number;

}
