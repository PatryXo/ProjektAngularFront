import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validator, Validators} from '@angular/forms';
import {Movie} from "../../Model/movie";

import {ApiService} from "../../services/api.service";


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {

  formGroup!: FormGroup;
  @Input() movieList!: Movie[]
  @Output() movieListBack: EventEmitter<Movie> = new EventEmitter()
  status: number = -1;


  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private change: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)]}],
      duration: ['', {validators: [Validators.required]}],
    })


  }

  onSubmit(check: any) {
    let movie: Movie = new Movie(this.formGroup.get('title')?.value,
      +this.formGroup.get('duration')?.value
    );
    this.apiService.addMovie(movie).subscribe();
    this.formGroup.reset();
    this.movieListBack.emit(movie);
    this.status = -1;

    // window.location.reload()
  }

  showForm() {
    this.status = 1;
  }
}


