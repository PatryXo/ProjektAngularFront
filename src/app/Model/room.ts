export class Room {

  private _number: number;
  private _capacity: number;

  constructor(number: number, capacity: number) {
    this._number = number;
    this._capacity = capacity;
  }

  get capacity(): number {
    return this._capacity;
  }

  set capacity(value: number) {
    this._capacity = value;
  }

  set number(value: number) {
    this._number = value;
  }

  get number(): number {
    return this._number;
  }

}
