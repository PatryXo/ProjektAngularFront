import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Showing } from 'src/app/Model/showing';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-showing-on-date',
  templateUrl: './showing-on-date.component.html',
  styleUrls: ['./showing-on-date.component.css']
})
export class ShowingOnDateComponent implements OnInit {

  showingList: Showing[] = []
  filteredList: Showing[] = []
  formGroup!: FormGroup
  date: Date

  constructor(private service: ApiService, private formBuilder: FormBuilder) {
    this.date = new Date()
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      date: ['']
    })

    this.onChanges();

    this.service.getAllShowings().subscribe(data => {
      //@ts-ignore
      data.forEach((showing: Showing) => {
        this.showingList.push(showing);
      })

      this.filterShowings()
    })

  }

  onChanges(): void {
    this.formGroup.valueChanges.subscribe(value => {
      this.date = new Date(value.date)

      this.filterShowings()
    })
  }

  filterShowings(): void {

    this.filteredList = this.showingList.filter(e => new Date(e.date).getDate() === this.date.getDate()
      && new Date(e.date).getMonth() === this.date.getMonth()
      && new Date(e.date).getFullYear() === this.date.getFullYear())
  }

}
