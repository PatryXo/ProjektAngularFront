import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from 'src/app/Model/movie';
import { Room } from 'src/app/Model/room';
import { ApiService } from 'src/app/services/api.service';
import { Showing } from '../../Model/showing';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-showing-detalis',
  templateUrl: './showing-detalis.component.html',
  styleUrls: ['./showing-detalis.component.css']
})
export class ShowingDetalisComponent implements OnInit {
  id!: number;
  showing!: Showing;
  movie!: Movie;
  room!: Room;
  title!: string;
  roomNumber!: number;
  roomCapacity!: number;
  movieDuration!: number;
  date!: Date;
  takenSeats!: number[];
  emptySeats: number[] = [];
  formGroup!: FormGroup;
  ticket = new FormControl('', [Validators.required]);
  
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id = parseInt(params['id']);
    });
    this.apiService.getAllShowings().subscribe(this.processShowings())

    this.formGroup = this.formBuilder.group({
      ticket: this.ticket
    });    
    this.formGroup.setValue({
      ticket: ''
    })
  }
  
  processShowings(){
    //@ts-ignore
    return data =>{
      this.showing = data[this.id];
      this.title = this.showing.movie.title;
      this.roomNumber = this.showing.room.number;
      this.roomCapacity = this.showing.room.capacity;
      this.movieDuration = this.showing.movie.duration;
      this.takenSeats = this.showing.takenSeats;
      this.movie = this.showing.movie;
      this.room = this.showing.room;
      this.date = this.showing.date;
      this.seats();
    }
  }

  seats() {
    for(let i = 0; i < this.roomCapacity; i++) {
      this.emptySeats[i] = i + 1;
    }
    this.filterSeats();
  }

  filterSeats() {
    this.emptySeats = this.emptySeats.filter(e => !this.takenSeats.includes(e))
  }

  onSubmit() {
    let seat = this.formGroup.get('ticket')?.value; 
    if(seat !== '') {
      this.takenSeats.push(parseInt(seat));

      let showing = new Showing(this.movie, this.room, this.takenSeats, this.date);

      this.apiService.editShowing(showing, this.id).subscribe();
      this.snackBar.open('Kupiono bilet!', '', {duration: 3000});
      this.filterSeats();
      this.router.navigateByUrl('/showings/' + this.id);
    }
    this.formGroup.setValue({
      ticket: ''
    });
  }
}
