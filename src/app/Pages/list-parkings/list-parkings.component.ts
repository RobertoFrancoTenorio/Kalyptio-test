import { FormControl, FormGroup } from '@angular/forms';
import { APIServiceService } from './../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-parkings',
  templateUrl: './list-parkings.component.html',
  styleUrls: ['./list-parkings.component.scss']
})
export class ListParkingsComponent implements OnInit {
  parkingList: [] = [];
  closeResult = '';
  current_parking: Object;
  filtered: any;
  filterForm: any;

  constructor(
    private router: Router,
    private parking_Service: APIServiceService,
    private modalService: NgbModal,
    private readonly sanitizer: DomSanitizer
  ) {
    this.loadParkings();

  }

  ngOnInit(): void {
    this.filterForm = this.filter_form_builder();
  }

  go_to_add_Parking(){
    const navigationExtras : NavigationExtras = {
      state: {
        estatus: true
      }
    }
    this.router.navigate(['new'], navigationExtras)
  }

  get_Parking(id, content){
    this.parking_Service.get_Parking(id).subscribe(parking => {
      this.current_parking = parking
    })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		);
  }

  async filter_parkings(filter, value){
    let filtrados = []
    let navigationExtras : NavigationExtras = {}
    await this.parking_Service.getParkings().subscribe(parkings => {
      this.filtered = parkings.filter(parking => parking[filter] === value)
      switch(filter){
        case 'Max Price':
          navigationExtras.state = parkings.filter(parking => parking[filter] >= value)
        break;
        case 'Min Price':
          navigationExtras.state = parkings.filter(parking => parking[filter] <= value)
        break;
        default:
          navigationExtras.state = parkings.filter(parking => parking[filter] == value)
      }
      console.log('filtrados',  navigationExtras.state);
    })
  }

  filter_form_builder(){
    return new FormGroup({
      filter: new FormControl(""),
      value: new FormControl(""),
    })
  }

  loadParkings(){
    this.parking_Service.getParkings().subscribe(parkings => {
      console.log('Parking', parkings)
      this.parkingList = parkings
    })
  }
}
