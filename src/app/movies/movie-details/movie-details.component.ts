import {Component, OnInit} from '@angular/core';
import {Movie} from "../../Model/movie";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import { Chart, registerables  } from 'chart.js';
import { Showing } from '../../Model/showing';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  id!: number;
  movie!: Movie;
  title!: string;
  duration!: number;
  takenSeats!: number[];
  labelArray: string[] = [];
  valueArray: number[] = [];

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
    this.apiService.getAllMovies().subscribe(this.processMovies());
    this.apiService.getAllShowings().subscribe(this.processShowings())
    this.activatedRoute.data.subscribe()
  }

  processMovies() {
    // @ts-ignore
    return data => {
      this.movie = data[this.id];
      this.title = this.movie.title;
      this.duration = this.movie.duration;
    }
  }

  processShowings(){
    //@ts-ignore
    return data =>{
      data.forEach((showing: Showing) => {
        if(showing.movie.title === this.title) {
          let tmp = showing.date.toString().split('T');
          let iteration = this.labelArray.find(element => element === tmp[0]);
          if(iteration != undefined) {
            let index = this.labelArray.findIndex(element => element === tmp[0]);
            this.valueArray[index] += showing.takenSeats.length;
          } else {
            this.labelArray.push(tmp[0]);
            this.valueArray.push(showing.takenSeats.length);
          }
        }
      });
      this.createChart();
    }
  }

  createChart() {
    //@ts-ignore
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labelArray,
        datasets: [{
          label: 'Sprzedane bilety',
          data: this.valueArray,
          backgroundColor: '#CBC3E3'
        }]
      }
    })
  }
}
