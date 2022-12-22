import { APIServiceService } from './../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-new-parking',
  templateUrl: './new-parking.component.html',
  styleUrls: ['./new-parking.component.scss']
})
export class NewParkingComponent implements OnInit {

  current_parking_list: any = [];
  parking_form: FormGroup;
  amenitiesForm: FormGroup;
  imagesForm: FormGroup;

  services = [
    {name: 'Cámaras'},
    {name: 'Cajón Techado'},
    {name: 'Departamento'},
    {name: 'Planta Baja'},
    {name: 'Estacionamiento Cerrado'},
    {name: 'Lugar en batería'},
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private parkingService: APIServiceService
  ) {
    if(this.router.getCurrentNavigation().extras.state){
      console.log('router', this.router.getCurrentNavigation().extras.state.parkingList);
      this.current_parking_list = this.router.getCurrentNavigation().extras.state.parkingList
    } else {
      this.router.navigate([''])
    }
  }

  ngOnInit(): void {
    this.parking_form = this.form_constructor();
    this.amenitiesForm = this.fb.group({
      amenities: new FormArray(this.services.map(control => new FormControl(false))),
    });
    this.imagesForm = this.fb.group({
    });
  }

  form_constructor(): FormGroup{
    return new FormGroup({
      address: new FormControl(""),
      amenities: new FormControl(""),
      score: new FormControl(""),
      price: new FormControl(""),
      type: new FormControl(""),
      description: new FormControl(""),
      image: new FormControl(""),
    })
  }

  save_parking(){
    let list_amenities = {
      amenities: this.amenitiesForm.value.amenities.map((checked, index) => checked ? this.services[index].name : null).filter(value => value !== null)
    }
    this.parking_form.value.amenities = list_amenities.amenities;
    this.current_parking_list.push(this.parking_form.value);

    this.parkingService.save_Parking(this.parking_form.value).subscribe(parking =>{
      console.log('parking', parking)
    })

    const navigationExtras : NavigationExtras = {
      state: {
        parkingList: this.current_parking_list
      }
    }
    this.router.navigate([''], navigationExtras)
  }

}
