import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-new-parking',
  templateUrl: './new-parking.component.html',
  styleUrls: ['./new-parking.component.scss']
})
export class NewParkingComponent implements OnInit {

  current_parking_list: any = [];
  parking_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
  }

  form_constructor(): FormGroup{
    return new FormGroup({
      address: new FormControl(""),
      amenities: new FormControl(""),
      score: new FormControl(""),
      price: new FormControl(""),
      type: new FormControl(""),
      description: new FormControl(""),
    })
  }

  save_parking(){
    this.current_parking_list.push(this.parking_form.value);
    console.log('New parking', this.current_parking_list);

    const navigationExtras : NavigationExtras = {
      state: {
        parkingList: this.current_parking_list
      }
    }
    this.router.navigate([''], navigationExtras)
  }

}
