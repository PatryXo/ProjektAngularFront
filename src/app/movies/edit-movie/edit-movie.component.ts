import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../Model/movie";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  @Input() movieList!: Movie[]
  @Input() selected!: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  showForm(): void {
    this.selected = 0;
  }

  save(): void {
    this.selected = -1;

  }

  back(): void {
    this.selected = -1;
  }
}
