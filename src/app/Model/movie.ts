export class Movie {

  private _title: string;
  private _duration: number;

  constructor(title: string, duration: number) {
    this._title = title;
    this._duration = duration;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }


}
