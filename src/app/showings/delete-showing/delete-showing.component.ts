import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delete-showing',
  templateUrl: './delete-showing.component.html',
  styleUrls: ['./delete-showing.component.css']
})
export class DeleteShowingComponent implements OnInit {
  id!: number;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id = parseInt(params['id']);
    });
    this.deleteShowing();
  }

  deleteShowing() {
    this.apiService.deleteShowing(this.id).subscribe();
    this.router.navigateByUrl('/showings');
  }
}
