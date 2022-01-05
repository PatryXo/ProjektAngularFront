import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showings',
  templateUrl: './showings.component.html',
  styleUrls: ['./showings.component.css']
})
export class ShowingsComponent implements OnInit {
  number!: number
  capacity !: number

  constructor() {
  }

  ngOnInit(): void {
   this.number = 1;
   this.capacity = 120;
  }

}
