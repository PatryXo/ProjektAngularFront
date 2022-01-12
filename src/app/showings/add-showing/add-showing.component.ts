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

  processShowings(){
    //@ts-ignore
    return data =>{
     data.forEach((showing: Showing) => {
       this.showingsList.push(showing);
     });
    }
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
    console.log(this.formGroup.get('movie')?.value);
    console.log(this.formGroup.get('room')?.value);
    console.log(this.formGroup.get('date')?.value);
    
    if(this.formGroup.get('movie')?.value !== '' ||
       this.formGroup.get('room')?.value !== '' ||
       this.formGroup.get('date')?.value !== '') {

      let title: string = this.formGroup.get('movie')?.value;
      let rNumber: number = parseInt(this.formGroup.get('room')?.value);
      let takenSeats: number[] = [];
      let date: Date = this.formGroup.get('date')?.value;

      let movie: Movie[] = this.moviesList.filter(movie => movie.title === title);
      let room: Room[] = this.roomsList.filter(room => room.number === rNumber);
      console.log(movie);
      console.log(room);

      //if(this.check(date, room)) {
        let showing = new Showing(movie[0], room[0], takenSeats, date);

        this.apiService.addShowing(showing).subscribe();
        this.snackBar.open('Dodano seans!', '', {duration: 3000});
        this.router.navigateByUrl('/showings');
        // this.router.navigate(['/showings']);
      //  console.log("git");
      // } else {
      //   console.log("blędne dane");
      // }
    } 
  }

  check(date: Date, room: Room): boolean {
    let now: Date = new Date();
    let nowSplited = now.toString().split(" ");
    let nowTime = nowSplited[4].split(":");
    let nowDate = (now.getFullYear().toString() + ":" + (now.getMonth() + 1).toString() + ":" + now.getDate().toString()).split(":");

    let tmp = date.toString().split("T");
    let newShowingTime = tmp[1].toString().split(":");
    let newShowingDate = tmp[0].toString().split("-");

    newShowingDate.forEach(element => { parseInt(element)})

    console.log(nowDate);
    console.log(newShowingDate);

    console.log("rok");
    if(newShowingDate[0] >= nowDate[0]) {
      console.log("miesiac");
      if(newShowingDate[1] >= nowDate[1]) {
        console.log("dzien");
        if(newShowingDate[2] >= nowDate[2]) {
          console.log("godzina");
          if(newShowingTime[0] >= nowTime[0]) {
            console.log("minuty");
            if(newShowingTime[1] >= nowTime[1]) {
              // this.showingsList.forEach(showing => {
              //   let 
              // })
              return true;
            } else return false;
          } else return false;
        } else return false;
      } else return false;
    } else return false;
  }
}
