import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Showing } from '../../Model/showing';

@Component({
  selector: 'app-showing-detalis',
  templateUrl: './showing-detalis.component.html',
  styleUrls: ['./showing-detalis.component.css']
})
export class ShowingDetalisComponent implements OnInit {
  id!: number;
  showing!: Showing;
  title!: string;
  room!: number;
  duration!: number;
  date!: Date;
  
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id = parseInt(params['id']);
    });
    this.apiService.getAllShowings().subscribe(this.processShowings())
  }
  
  processShowings(){
    //@ts-ignore
    return data =>{
      this.showing = data[this.id];
      this.title = this.showing.movie.title;
      this.room = this.showing.room.number;
      this.duration = this.showing.movie.duration;
      this.date = this.showing.date;
    }
  }
}
