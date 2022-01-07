import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';

import {ApiService} from "../../services/api.service";

import { Showing } from '../../Model/showing';
import { Movie } from '../../Model/movie';
import { Room } from '../../Model/room';

@Component({
  selector: 'app-add-showing',
  templateUrl: './add-showing.component.html',
  styleUrls: ['./add-showing.component.css']
})
export class AddShowingComponent implements OnInit {
  
  @Input() showingsList: Showing[] = [];
  @Output() updatedShowingsList:  EventEmitter<Showing> = new EventEmitter();
  moviesList: Movie[] = [];
  roomsList: Room[] = [];
  formGroup!: FormGroup;
  movie = new FormControl('');
  room = new FormControl('');
  date = new FormControl('');

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      movie: this.movie,
      room: this.room,
      date: this.date
    });

    this.apiService.getAllRooms().subscribe(this.processRooms());
    this.apiService.getAllMovies().subscribe(this.processMovies());
  }

  processRooms() {
    // @ts-ignore
    return data => {
      data.forEach((room:Room) => {
        let tmp: Room = new Room(room.number, room.capacity);
        this.roomsList.push(tmp);
      });
    }
  }

  processMovies() {
    // @ts-ignore
    return data => {
      data.forEach((movie:Movie) => {
        let tmp: Movie = new Movie(movie.title, movie.duration);
        this.moviesList.push(tmp);
      });
      this.moviesList = data.map((el: any) => new Movie(el.title, el.duration));
    }
  }

  onSubmit() {
    let movie: Movie = this.formGroup.get('movie')?.value;
    let room: Room = this.formGroup.get('room')?.value;
    let takenSeats: number[] = [];
    let date: Date = this.formGroup.get('date')?.value;

    let showing = new Showing(movie, room, takenSeats, date);

    console.log(showing)
    console.log(showing.movie);
    this.apiService.addShowing(showing).subscribe();
    this.showingsList.push(showing);
    this.updatedShowingsList.emit(showing);
    this.formGroup.reset()
  }

}
