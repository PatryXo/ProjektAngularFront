import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';

import { Movie } from 'src/app/Model/movie';
import { Room } from 'src/app/Model/room';
import { Showing } from 'src/app/Model/showing';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-showing',
  templateUrl: './edit-showing.component.html',
  styleUrls: ['./edit-showing.component.css']
})
export class EditShowingComponent implements OnInit {

  id!: number;
  showing!: Showing;
  showingsList: Showing[] = [];
  moviesList: Movie[] = [];
  roomsList: Room[] = [];
  formGroup!: FormGroup;
  title!: string;
  roomNumber!: string;
  movie = new FormControl('', [Validators.required]);
  room = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
    this.apiService.getAllShowings().subscribe(this.processShowings())
    this.apiService.getAllRooms().subscribe(this.processRooms());
    this.apiService.getAllMovies().subscribe(this.processMovies());
    this.formGroup = this.formBuilder.group({
      movie: this.movie,
      room: this.room,
      date: this.date
    });
  }

  processShowings() {
    //@ts-ignore
    return data => {
      this.showingsList = data;
      this.showing = data[this.id];
      this.update();
    }
  }

  update() {
    this.title = this.showing.movie.title;
    this.roomNumber = this.showing.room.number.toString();
    this.formGroup.setValue({
      movie: this.title,
      room: this.roomNumber,
      date: this.showing.date
    });
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
    let title: string = this.formGroup.get('movie')?.value;
    let rNumber: number = parseInt(this.formGroup.get('room')?.value);
    let takenSeats: number[] = this.showing.takenSeats;
    let date: Date = this.formGroup.get('date')?.value;

    let movie: Movie[] = this.moviesList.filter(movie => movie.title === title);
    let room: Room[] = this.roomsList.filter(room => room.number === rNumber);
    if (movie === undefined || room === undefined || date === undefined) {
      console.log("brak");
    } else {
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

          this.apiService.editShowing(showing, this.id).subscribe();
          this.snackBar.open('Edytowano seans!', '', { duration: 3000 });
          this.router.navigateByUrl('/showings/' + this.id);
        }
      }
    }
  }
}
