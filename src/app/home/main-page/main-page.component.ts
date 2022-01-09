import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {

    let labelArray = [new Date().toDateString(), new Date().toDateString(), new Date().toDateString()]
    let valueArray = [1, 2, 3]

    //@ts-ignore
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labelArray,
        datasets: [{
          label: 'Sprzedane bilety',
          data: valueArray,
          backgroundColor: '#CBC3E3'
        }]
      }
    })
  }

}


