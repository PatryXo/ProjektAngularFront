import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../Model/movie";
import {ApiService} from "../../services/api.service";
import {Showing} from "../../Model/showing";
import {Room} from "../../Model/room";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  id!: number;
  formGroup!: FormGroup;
  title!: string;
  duration!: number;
  movie!: Movie;
  titleForm = new FormControl('', {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)]})
  durationForm = new FormControl('', {validators: [Validators.required]})



  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
    this.apiService.getAllMovies().subscribe(this.processMovies());
    this.formGroup = this.formBuilder.group({
      titleForm: ['', {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)]}],
      durationForm: ['', {validators: [Validators.required]}],
    });
  }

  processMovies() {
    // @ts-ignore
    return data => {
      this.movie = data[this.id];
      this.title = this.movie.title;
      this.duration = this.movie.duration;
      this.update();
    }
  }

  update() {
    this.formGroup.setValue({
      titleForm: this.title,
      durationForm: this.duration
    });
  }

  save(): void {
    let title: string = this.formGroup.get('titleForm')?.value;
    let duration: number = parseInt(this.formGroup.get('durationForm')?.value)
    this.movie.title = title;
    this.movie.duration = duration;
    this.apiService.editMovie(this.movie, this.id).subscribe();
    this.router.navigateByUrl('/movies/' + this.id);

  }


}
