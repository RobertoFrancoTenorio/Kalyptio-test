import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewParkingComponent } from './Pages/new-parking/new-parking.component';
import { ListParkingsComponent } from './Pages/list-parkings/list-parkings.component';
import { FilteredParkingsComponent } from './Pages/filteredParkings/filtered-parkings/filtered-parkings.component';
import { ParkingDetailsComponent } from './Pages/parking-details/parking-details.component';

const routes: Routes = [
  { path: 'new', component: NewParkingComponent},
  { path: 'filtered-parkings', component: FilteredParkingsComponent},
  { path: 'parking-details', component: ParkingDetailsComponent},
  { path: '', component: ListParkingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
