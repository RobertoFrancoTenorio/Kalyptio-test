import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewParkingComponent } from './Pages/new-parking/new-parking.component';
import { ListParkingsComponent } from './Pages/list-parkings/list-parkings.component';


const routes: Routes = [
  { path: 'new', component: NewParkingComponent},
  { path: '', component: ListParkingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
