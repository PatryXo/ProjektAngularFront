import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MoviesComponent} from './movies/movies.component';
import {RoomsComponent} from './rooms/rooms.component';
import {ShowingsComponent} from './showings/showings.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AddMovieComponent} from './movies/add-movie/add-movie.component';
import {MovieDetailsComponent} from './movies/movie-details/movie-details.component';
import {EditMovieComponent} from './movies/edit-movie/edit-movie.component';
import {DeleteMovieComponent} from './movies/delete-movie/delete-movie.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddShowingComponent} from './showings/add-showing/add-showing.component';
import {ShowingDetalisComponent} from './showings/showing-detalis/showing-detalis.component';
import {MainPageComponent} from './home/main-page/main-page.component';
import {CurrentShowingComponent} from './home/current-showing/current-showing.component';
import {ShowingOnDateComponent} from './home/showing-on-date/showing-on-date.component';
import {EditShowingComponent} from './showings/edit-showing/edit-showing.component';
import {ShowingComponent} from './showings/showing/showing.component';
import {DeleteShowingComponent} from './showings/delete-showing/delete-showing.component';
import {DateFormatPipe} from './pipes/date-format.pipe';
import {MovieComponent} from './movies/movie/movie.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { MaterialExampleModule } from './material.module';
import { ShowingListDirective } from './directive/showing-list.directive';



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
    ShowingOnDateComponent,
    EditShowingComponent,
    ShowingComponent,
    DeleteShowingComponent,
    DateFormatPipe,
    MovieComponent,
    ShowingListDirective,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MaterialExampleModule,
  ],
  providers: [],
  bootstrap: [AppComponent, AddMovieComponent, MovieDetailsComponent, MovieComponent, MoviesComponent]
})
export class AppModule {
}
