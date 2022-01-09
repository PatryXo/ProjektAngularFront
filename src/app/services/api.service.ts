import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from "rxjs";
import {Room} from "../Model/room";
import {Showing} from "../Model/showing";
import { Movie } from '../Model/movie';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private HttpClient: HttpClient) {
  }

  public getAllRooms(): Observable<Rooms> {
    return this.HttpClient.get<Rooms>('http://localhost:7777/room/all')
  }

  public getAllMovies(): Observable<Movies> {
    return this.HttpClient.get<Movies>('http://localhost:7777/movie/all')
  }

  public getAllShowings(): Observable<Showings> {
    return this.HttpClient.get<Showings>('http://localhost:7777/showing/all')
  }

  public addShowing(showing: Showing): Observable<Showing> {
    return this.HttpClient.post<Showing>('http://localhost:7777/showing/add', {movie: {title: showing.movie.title, duration: showing.movie.duration}, room: {number: showing.room.number, capacity: showing.room.capacity}, takenSeats: showing.takenSeats, date: showing.date});
  }

  public editShowing(showing: Showing, id: number): Observable<Showing> {
    return this.HttpClient.put<Showing>('http://localhost:7777/showing/edit/' + id, {movie: {title: showing.movie.title, duration: showing.movie.duration}, room: {number: showing.room.number, capacity: showing.room.capacity}, takenSeats: showing.takenSeats, date: showing.date});
  }

  public deleteShowing(id:number): Observable<Showing> {
    return this.HttpClient.delete<Showing>('http://localhost:7777/showing/delete/' + id);
  }

  public addMovie(movie: Movie): Observable<Movie> {
    return this.HttpClient.post<Movie>('http://localhost:7777/movie/add', {
      title: movie.title,
      duration: movie.duration
    })
  }

  public editMovie(movie: Movie, id: number): Observable<Movie> {
    return this.HttpClient.put<Movie>('http://localhost:7777/movie/edit/' + id, {
      title: movie.title,
      duration: movie.duration
    })
  }

  public deleteMovie(id: number): Observable<Movie> {
    return this.HttpClient.delete<Movie>('http://localhost:7777/movie/delete/' + id)
  }
}

export interface Rooms {
  roomList: Room[];
}

export interface Movies {
  movieList: Movie[];
}

export interface Showings {
  showingList: Showing[]
}



