import { Component, Input, OnInit } from '@angular/core';
import { Showing } from 'src/app/Model/showing';

@Component({
  selector: 'app-showing',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.css']
})
export class ShowingComponent implements OnInit {
  @Input() showing!: Showing;
  constructor() { }

  ngOnInit(): void {
  }

}
