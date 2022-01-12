import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit {

  id!: number;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
    this.deleteMovie();
  }

  deleteMovie(): void {
    this.apiService.deleteMovie(this.id).subscribe();
    this.snackBar.open('Usunięto film!', '', {duration: 3000});
    this.router.navigateByUrl('/movies')
  }
}
