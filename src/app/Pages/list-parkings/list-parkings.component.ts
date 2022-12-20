import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list-parkings',
  templateUrl: './list-parkings.component.html',
  styleUrls: ['./list-parkings.component.scss']
})
export class ListParkingsComponent implements OnInit {
  parkingList: [] = [];
  constructor(
    private router: Router
  ) {
    console.log('router', this.router.getCurrentNavigation())
    if(this.router.getCurrentNavigation().extras.state){
      console.log('Si contiene state');
    } else {
      console.log('No contiene state');
    }
  }

  ngOnInit(): void {
  }

  go_to_add_Parking(){
    const navigationExtras : NavigationExtras = {
      state: {
        parkingList: this.parkingList
      }
    }
    this.router.navigate(['new'], navigationExtras)
  }

}
