import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from "rxjs";
import {Room} from "../Model/room";



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private HttpClient: HttpClient) {


  }

  public getRooms(): Observable <Rooms>{
    console.log('xx')
    let x = this.HttpClient.get<Rooms>('http://localhost:8080/room/all');
    console.log(x);
    console.log("aaaa")
    return this.HttpClient.get<Rooms>('http://localhost:8080/room/all')


  }

}
export interface Rooms {

    roomList: Room[];
}

