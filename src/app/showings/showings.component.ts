import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {Showing} from "../Model/showing";

@Component({
  selector: 'app-showings',
  templateUrl: './showings.component.html',
  styleUrls: ['./showings.component.css']
})
export class ShowingsComponent implements OnInit {

  showingList: Showing[] = []

  constructor(private apiServie: ApiService) {
  }

  ngOnInit(): void {
   this.listShowing();
  }
  listShowing(){
    this.apiServie.getAllShowings().subscribe(this.processResult())
  }

  processResult(){
    //@ts-ignore
    return data =>{
      this.showingList = data;
    }
  }
}
