import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from "../../Model/movie";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit {

  id!: number;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
    this.deleteMovie();
  }

  deleteMovie(): void {
    this.apiService.deleteMovie(this.id).subscribe();
    this.router.navigateByUrl('/movies')
  }
}
