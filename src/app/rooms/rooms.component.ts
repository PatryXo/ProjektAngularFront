import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Room} from "../Model/room";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = []
  private name!: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.listRoom();
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
  }

  listRoom() {
    this.apiService.getAllRooms().subscribe(this.processResult())
  }

  processResult() {
    // @ts-ignore
    return data => {
      data.forEach((room:Room) =>{
        let tmp:Room = new Room(room.number,room.capacity)
        this.rooms.push(tmp);
      })
    }
  }
}


