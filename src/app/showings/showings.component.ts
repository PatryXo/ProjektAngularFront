import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import { Showing } from '../Model/showing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showings',
  templateUrl: './showings.component.html',
  styleUrls: ['./showings.component.css']
})
export class ShowingsComponent implements OnInit {

  showingsList: Showing[] = [];
  selected!: number;

  constructor(private apiServie: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiServie.getAllShowings().subscribe(this.processShowings())
  }

  processShowings(){
    //@ts-ignore
    return data =>{
     data.forEach((showing: Showing) => {
       this.showingsList.push(showing);
     });
    }
  }

  onSelect(id: number) {
    this.router.navigateByUrl('/showings/' + id);
    this.selected = id;
  }

  addShowing(event: Showing) {
    this.showingsList.push(event);
  }

  updateSelected(event: number) {
    this.selected = event;
  }
}
