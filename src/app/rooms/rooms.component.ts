import { Component, OnInit } from '@angular/core';
import {ApiService, Rooms} from "../services/api.service";
import {Room} from "../Model/room";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.listRoom();

  }
  listRoom(){
    this.apiService.getRooms().subscribe(this.processResult())

  }
  processResult(){
    // @ts-ignore
    return data => {
      this.rooms = data;
    }

  }

}


