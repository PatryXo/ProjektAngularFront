import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../Model/movie";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  @Input() movieList!: Movie[]
  @Input() selected!: number;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  showForm(): void {
    this.selected = 0;
  }

  save(): void {
    this.apiService.editMovie(this.movieList[this.selected],this.selected).subscribe();
    this.selected = -1;
    console.log(this.movieList)


  }

  back(): void {
    this.selected = -1;
  }
}
