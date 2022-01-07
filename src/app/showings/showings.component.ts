import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import { Showing } from '../Model/showing';

@Component({
  selector: 'app-showings',
  templateUrl: './showings.component.html',
  styleUrls: ['./showings.component.css']
})
export class ShowingsComponent implements OnInit {

  showingsList: Showing[] = []

  constructor(private apiServie: ApiService) {
  }

  ngOnInit(): void {
   this.listShowing();
   console.log(this.showingsList);
  }
  listShowing(){
    this.apiServie.getAllShowings().subscribe(this.processResult())
  }

  processResult(){
    //@ts-ignore
    return data =>{
     data.forEach((showing: Showing) => {
       this.showingsList.push(showing);
     });
    }
  }

  updateList(event: Showing) {
    this.showingsList.push(event);
  }
}
