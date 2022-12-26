import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewParkingComponent } from './Pages/new-parking/new-parking.component';
import { ListParkingsComponent } from './Pages/list-parkings/list-parkings.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilteredParkingsComponent } from './Pages/filteredParkings/filtered-parkings/filtered-parkings.component';
import { ParkingDetailsComponent } from './Pages/parking-details/parking-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NewParkingComponent,
    ListParkingsComponent,
    FilteredParkingsComponent,
    ParkingDetailsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
