import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from "rxjs";
import {Room} from "../Model/room";
import {Movie} from "../Model/movie";



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private HttpClient: HttpClient) {


  }

  public getAllRooms(): Observable <Rooms>{
    return this.HttpClient.get<Rooms>('http://localhost:8080/room/all')
  }

  public getAllMovies(): Observable<Movies>{
    //return this.HttpClient.get<Movies>('http://localhost:8080/movie/all')
    return this.HttpClient.get<Movies>('http://localhost:8080/movie/all')
  }


}
export interface Rooms {

    roomList: Room[];
}

export interface Movies{
   movieList: Movie[];
}

