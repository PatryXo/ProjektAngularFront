import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';

import { Movie } from 'src/app/Model/movie';
import { Room } from 'src/app/Model/room';
import { Showing } from 'src/app/Model/showing';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-showing',
  templateUrl: './edit-showing.component.html',
  styleUrls: ['./edit-showing.component.css']
})
export class EditShowingComponent implements OnInit {

  id!: number;
  showing!: Showing;
  moviesList: Movie[] = [];
  roomsList: Room[] = [];
  formGroup!: FormGroup;
  movie = new FormControl('');
  room = new FormControl('');
  date = new FormControl('');
  
  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
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
    this.formGroup.setValue({
      movie: this.movie,
      room: this.room,
      date: this.date
    });
  }

  processShowings(){
    //@ts-ignore
    return data =>{
      this.showing = data[this.id];
      this.update();
    }
  }

  update() {
    this.formGroup.setValue({
      movie: this.showing.movie,
      room: this.showing.room,
      date: this.showing.date
    });
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

    console.log(movie);
    console.log(room);
    console.log(this.formGroup.get('date')?.value);
    if(movie === undefined || room === undefined || date === undefined) {
      console.log("brak");
    } else {
      let showing = new Showing(movie, room, takenSeats, date);

      console.log(showing)
      console.log(showing.movie);
      this.apiService.editShowing(showing, this.id).subscribe();
      //this.showingsList.push(showing);
      this.formGroup.reset()
      this.router.navigateByUrl('/showings/' + this.id);
    }
  }

  back(): void {
    this.router.navigateByUrl('/showings/' + this.id);
  }

}
