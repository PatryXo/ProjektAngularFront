import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ShowingsComponent } from './showings/showings.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { DeleteMovieComponent } from './movies/delete-movie/delete-movie.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddShowingComponent } from './showings/add-showing/add-showing.component';
import { ShowingDetalisComponent } from './showings/showing-detalis/showing-detalis.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { CurrentShowingComponent } from './home/current-showing/current-showing.component';
import { ShowingOnDateComponent } from './home/showing-on-date/showing-on-date.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    RoomsComponent,
    ShowingsComponent,
    AddMovieComponent,
    MovieDetailsComponent,
    EditMovieComponent,
    DeleteMovieComponent,
    AddShowingComponent,
    ShowingDetalisComponent,
    MainPageComponent,
    CurrentShowingComponent,
    ShowingOnDateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
