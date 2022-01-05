import {Component, OnInit} from '@angular/core';
import {ApiService, Rooms} from "../services/api.service";
import {Room} from "../Model/room";
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

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
      this.rooms = data;
    }

  }

}


