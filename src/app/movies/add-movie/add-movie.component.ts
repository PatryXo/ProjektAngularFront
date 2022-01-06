import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
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
  @Output() movieListBack:  EventEmitter<Movie> = new EventEmitter()


  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private change: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: [''],
      duration: [''],
    })
  }

  onSubmit() {
    let movie: Movie = new Movie(this.formGroup.get('title')?.value,
      +this.formGroup.get('duration')?.value
    )
    this.apiService.addMovie(movie).subscribe();
    this.formGroup.reset()
    this.movieListBack.emit(movie)

    // window.location.reload()


  }
}


