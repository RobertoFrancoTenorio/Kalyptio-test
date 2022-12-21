import { APIServiceService } from './../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list-parkings',
  templateUrl: './list-parkings.component.html',
  styleUrls: ['./list-parkings.component.scss']
})
export class ListParkingsComponent implements OnInit {
  parkingList: [] = [];
  urlPic: string;
  newUrl: any;
  constructor(
    private router: Router,
    private parking_Service: APIServiceService,
    private readonly sanitizer: DomSanitizer
  ) {
    console.log('router', this.router.getCurrentNavigation())
    if(this.router.getCurrentNavigation().extras.state){
      console.log('Si contiene state');
      this.parkingList = this.router.getCurrentNavigation().extras.state.parkingList
      console.log('lista', this.parkingList)
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
