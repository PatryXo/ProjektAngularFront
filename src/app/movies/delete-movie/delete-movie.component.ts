import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from "../../Model/movie";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit {

  @Input() selected!: number;
  @Input() movieList!: Movie[];
  @Output() afterDelete: EventEmitter<Movie[]> = new EventEmitter();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  deleteMovie(): void {
    this.movieList = this.movieList.filter(movie => movie !== this.movieList[this.selected]);
    this.apiService.deleteMovie(this.selected).subscribe();
    this.afterDelete.emit(this.movieList);
    this.selected = -1;

  }
}
