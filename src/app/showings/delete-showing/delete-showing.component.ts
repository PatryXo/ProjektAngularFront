import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-showing',
  templateUrl: './delete-showing.component.html',
  styleUrls: ['./delete-showing.component.css']
})
export class DeleteShowingComponent implements OnInit {
  id!: number;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { 
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id = parseInt(params['id']);
    });
    this.deleteShowing();
  }

  deleteShowing() {
    this.apiService.deleteShowing(this.id).subscribe();
    this.snackBar.open('Usunięto seans!', '', {duration: 3000});
    this.router.navigateByUrl('/showings');
  }
}
