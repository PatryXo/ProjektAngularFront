import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RoomsComponent} from "./rooms/rooms.component";
import {MoviesComponent} from "./movies/movies.component";
import {ShowingsComponent} from "./showings/showings.component";
import {AddMovieComponent} from "./movies/add-movie/add-movie.component";


const routes: Routes = [
  {path: 'rooms', component: RoomsComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movies/add', component: AddMovieComponent},
  {path: 'showings', component: ShowingsComponent},
  {path: '', redirectTo: '/rooms', pathMatch: 'full'}

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
