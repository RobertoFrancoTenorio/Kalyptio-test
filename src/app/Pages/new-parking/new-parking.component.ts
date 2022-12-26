import { APIServiceService } from './../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    if(!this.router.getCurrentNavigation().extras.state){
      this.router.navigate([''])
    }
  }

  ngOnInit(): void {
    this.parking_form = this.form_constructor();
    this.amenitiesForm = this.fb.group({
      amenities: new FormArray(this.services.map(control => new FormControl(false, [Validators.required]))),
    });
    this.imagesForm = this.fb.group({
    });
  }

  form_constructor(): FormGroup{
    return new FormGroup({
      address: new FormControl("", [Validators.required]),
      amenities: new FormControl(""),
      score: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      image: new FormControl(""),
    })
  }

  save_parking(){
    this.parking_form.value.amenities = this.amenitiesForm.value.amenities.map((checked, index) => checked ? this.services[index].name : null).filter(value => value !== null);

    this.parkingService.save_Parking(this.parking_form.value).subscribe(parking =>{
      console.log('parking', parking)
    })

    console.log('Amenities', this.amenitiesForm.value.amenities);

    this.alert()
  }

  alert(){
    Swal.fire({
      icon: 'success',
      title: 'Registro Completado',
      text: 'Parking almacenado con éxito',
      confirmButtonText: 'Save',
    }).then(() => {
      this.router.navigate([''])
    })
  }
  
  go_to_home(){
    this.router.navigate([''])
  }
}
