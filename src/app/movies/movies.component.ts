import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Movie} from "../Model/movie";
import {ApiService, Movies} from "../services/api.service";
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Room} from "../Model/room";
import {Router} from "@angular/router";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movieList: Movie[] = []
  formGroup!: FormGroup;
  editGroup!: FormGroup;
  title = new FormControl('')
  duration = new FormControl('')
  selected!: number;


  constructor(private apiService: ApiService, private formBuilder: FormBuilder,private router: Router) {
  }

  ngOnInit(): void {
    this.listRoom();

  }

  listRoom() {
    this.apiService.getAllMovies().subscribe(this.processResult())
  }

  processResult() {
    // @ts-ignore
    return data => {
      data.forEach((movie:Movie) =>{
        let tmp:Movie = new Movie(movie.title,movie.duration);
        this.movieList.push(tmp);
      })
      this.movieList = data.map((el: any) => new Movie(el.title, el.duration));
    }
  }

  infoBack(event: Movie) {
    this.movieList.push(event);
  }

  onSelect(movieId: number): void {
    this.router.navigateByUrl('/movies/' + movieId);
  }


  update(event: Movie[]) {
    this.movieList = event;
  }
}
