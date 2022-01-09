import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RoomsComponent} from "./rooms/rooms.component";
import {MoviesComponent} from "./movies/movies.component";
import {ShowingsComponent} from "./showings/showings.component";
import {AddMovieComponent} from "./movies/add-movie/add-movie.component";
import { AddShowingComponent } from './showings/add-showing/add-showing.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { CurrentShowingComponent } from './home/current-showing/current-showing.component';
import { ShowingOnDateComponent } from './home/showing-on-date/showing-on-date.component';
import { ShowingDetalisComponent } from './showings/showing-detalis/showing-detalis.component';
import { EditShowingComponent } from './showings/edit-showing/edit-showing.component';
import { DeleteShowingComponent } from './showings/delete-showing/delete-showing.component';
import {EditMovieComponent} from "./movies/edit-movie/edit-movie.component";
import {DeleteMovieComponent} from "./movies/delete-movie/delete-movie.component";
import {MovieDetailsComponent} from "./movies/movie-details/movie-details.component";


const routes: Routes = [
  {path: 'rooms', component: RoomsComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movies/add', component: AddMovieComponent},
  {path: 'movies/:id', component: MovieDetailsComponent},
  {path: 'movies/:id/edit', component: EditMovieComponent},
  {path: 'movies/:id/delete', component: DeleteMovieComponent},
  {path: 'showings', component: ShowingsComponent},
  {path: 'showings/add', component: AddShowingComponent},
  {path: 'showings/:id', component: ShowingDetalisComponent},
  {path: 'showings/:id/edit', component: EditShowingComponent},
  {path: 'showings/:id/delete', component: DeleteShowingComponent},
  {path: 'current-showing', component: CurrentShowingComponent},
  {path: 'showing-on-date', component: ShowingOnDateComponent},
  {path: '', component: MainPageComponent },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
