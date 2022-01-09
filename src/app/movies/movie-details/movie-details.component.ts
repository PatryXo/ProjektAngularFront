import {Component, OnInit} from '@angular/core';
import {Movie} from "../../Model/movie";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieList!: Movie[];
  id!: number;
  movie!: Movie;
  title!: string;
  duration!: number;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
    this.apiService.getAllMovies().subscribe(this.processMovies())
  }

  processMovies() {
    // @ts-ignore
    return data => {
      this.movie = data[this.id];
      this.title = this.movie.title;
      this.duration = this.movie.duration;

    }
  }
}
