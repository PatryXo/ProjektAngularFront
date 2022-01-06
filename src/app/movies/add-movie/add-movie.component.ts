import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {Movie} from "../../Model/movie";

import {ApiService} from "../../services/api.service";


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  formGroup!: FormGroup;
  @Input() movieList!: Movie[]
  title = new FormControl('')
  duration = new FormControl('')

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private change: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: this.title,
      duration: this.duration,
    })
  }

  onSubmit() {
    let movie: Movie = new Movie(this.formGroup.get('title')?.value,
      this.formGroup.get('duration')?.value
    )

    console.log(movie.title)
    this.apiService.addMovie(movie).subscribe(movie => this.movieList.push(movie));
    console.log(this.movieList)
    this.formGroup.reset()
    // this.ngOnInit()

  }


}
