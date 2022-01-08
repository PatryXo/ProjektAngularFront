import { Component, OnInit } from '@angular/core';
import { Showing } from 'src/app/Model/showing';
import { ApiService, Showings } from 'src/app/services/api.service';
import { ShowingsComponent } from 'src/app/showings/showings.component';

@Component({
  selector: 'app-current-showing',
  templateUrl: './current-showing.component.html',
  styleUrls: ['./current-showing.component.css']
})
export class CurrentShowingComponent implements OnInit {

  showingList: Showing[] = []

  constructor(private service: ApiService) {

  }

  ngOnInit(): void {

    this.service.getAllShowings().subscribe(data => {
      //@ts-ignore
      data.forEach((showing: Showing) => {
        this.showingList.push(showing);
      })

      let date = new Date();

      this.showingList = this.showingList.filter(e => new Date(e.date).getDate() === date.getDate() &&
        new Date(e.date).getFullYear() === date.getFullYear() &&
        new Date(e.date).getMonth() === date.getMonth() &&
        new Date(e.date).getHours() * 60 + new Date(e.date).getMinutes() <= date.getHours() * 60 + date.getMinutes() &&
        new Date(e.date).getHours() * 60 + new Date(e.date).getMinutes() + e.movie.duration >= date.getHours() * 60 + date.getMinutes())
    })


  }

}
