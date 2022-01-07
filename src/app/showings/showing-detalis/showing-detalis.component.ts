import { Component, Input, OnInit } from '@angular/core';
import { Showing } from '../../Model/showing';

@Component({
  selector: 'app-showing-detalis',
  templateUrl: './showing-detalis.component.html',
  styleUrls: ['./showing-detalis.component.css']
})
export class ShowingDetalisComponent implements OnInit {
  @Input() showing!: Showing;
  
  constructor() { }

  ngOnInit(): void {
  }

}
