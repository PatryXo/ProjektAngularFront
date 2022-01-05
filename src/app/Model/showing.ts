import {Movie} from "./movie";
import {Room} from "./room";


export class Showing {

  private _movie: Movie
  private _room: Room
  private _takenSeats: number[]
  private _date: Date

  constructor(movie: Movie, room: Room, takenSeats: number[], date: Date) {
    this._movie = movie;
    this._room = room;
    this._takenSeats = takenSeats;
    this._date = date
  }

  get movie(): Movie {
    return this._movie;
  }

  set movie(value: Movie) {
    this._movie = value;
  }

  get room(): Room {
    return this._room;
  }

  set room(value: Room) {
    this._room = value;
  }

  get takenSeats(): number[] {
    return this._takenSeats;
  }

  set takenSeats(value: number[]) {
    this._takenSeats = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

}
