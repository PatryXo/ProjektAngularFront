import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from "../../services/api.service";

import { Showing } from '../../Model/showing';
import { Movie } from '../../Model/movie';
import { Room } from '../../Model/room';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-showing',
  templateUrl: './add-showing.component.html',
  styleUrls: ['./add-showing.component.css']
})
export class AddShowingComponent implements OnInit {

  showingsList: Showing[] = [];
  moviesList: Movie[] = [];
  roomsList: Room[] = [];
  formGroup!: FormGroup;
  movie = new FormControl('', [Validators.required]);
  room = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      movie: this.movie,
      room: this.room,
      date: this.date
    });
    this.apiService.getAllRooms().subscribe(this.processRooms());
    this.apiService.getAllMovies().subscribe(this.processMovies());
    this.apiService.getAllShowings().subscribe(this.processShowings())

    this.formGroup.setValue({
      movie: '',
      room: '',
      date: ''
    });
  }

  processShowings() {
    //@ts-ignore
    return data => {
      data.forEach((showing: Showing) => {
        this.showingsList.push(showing);
      });
    }
  }

  processRooms() {
    // @ts-ignore
    return data => {
      data.forEach((room: Room) => {
        let tmp: Room = new Room(room.number, room.capacity);
        this.roomsList.push(tmp);
      });
    }
  }

  processMovies() {
    // @ts-ignore
    return data => {
      data.forEach((movie: Movie) => {
        let tmp: Movie = new Movie(movie.title, movie.duration);
        this.moviesList.push(tmp);
      });
      this.moviesList = data.map((el: any) => new Movie(el.title, el.duration));
    }
  }

  onSubmit() {

    if (this.formGroup.get('movie')?.value !== '' &&
      this.formGroup.get('room')?.value !== '' &&
      this.formGroup.get('date')?.value !== '') {

      let title: string = this.formGroup.get('movie')?.value;
      let rNumber: number = parseInt(this.formGroup.get('room')?.value);
      let takenSeats: number[] = [];
      let date: Date = this.formGroup.get('date')?.value;

      let movie: Movie[] = this.moviesList.filter(movie => movie.title === title);
      let room: Room[] = this.roomsList.filter(room => room.number === rNumber);


      let formDate = new Date(date);
      let currentDate = new Date()
      
      if (formDate.getTime() + movie[0].duration * 60000 < currentDate.getTime()) {
        this.snackBar.open('Data juz minela i nie mozna dodac seansu', '', { duration: 3000 })
      }
      else {
        let tmp = this.showingsList
        .filter(e => e.room.number === room[0].number 
          && (formDate.getTime() >= new Date(e.date).getTime() && formDate.getTime() <= new Date(e.date).getTime() + e.movie.duration * 60000 
          || formDate.getTime() + movie[0].duration * 60000 >= new Date(e.date).getTime() && formDate.getTime() + movie[0].duration * 60000 <= new Date(e.date).getTime() + e.movie.duration * 60000
          || new Date(e.date).getTime() >= formDate.getTime() && new Date(e.date).getTime() <= formDate.getTime() + movie[0].duration * 60000 
          || new Date(e.date).getTime() + e.movie.duration * 60000 >= formDate.getTime() && new Date(e.date).getTime() + e.movie.duration * 60000 <= formDate.getTime() + movie[0].duration * 60000))
        
        if (tmp.length) {
          this.snackBar.open('W trakcie podanej daty, sala jest zajeta', '', { duration: 3000 })
        }
        else {
          let showing = new Showing(movie[0], room[0], takenSeats, date);

          this.apiService.addShowing(showing).subscribe();
          this.snackBar.open('Dodano seans!', '', { duration: 3000 });
          this.router.navigateByUrl('/showings');
        }
      }
    }
  }
}
