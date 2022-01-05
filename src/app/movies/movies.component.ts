import { Component, OnInit } from '@angular/core';
import {Movie} from "../Model/movie";
import {ApiService, Movies} from "../services/api.service";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movieList: Movie[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.listRoom();

  }
  listRoom(){
    this.apiService.getAllMovies().subscribe(this.processResult())

  }
  processResult(){
    // @ts-ignore
    return data => {
      this.movieList = data;
    }

  }
}
