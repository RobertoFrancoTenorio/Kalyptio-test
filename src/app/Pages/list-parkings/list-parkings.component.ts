import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APIServiceService } from './../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-list-parkings',
  templateUrl: './list-parkings.component.html',
  styleUrls: ['./list-parkings.component.scss']
})
export class ListParkingsComponent implements OnInit {
  closeResult = '';
  current_parking: Object;

  filtered: any;
  filterForm: any;
  amenitiesForm: FormGroup;

  parkingList: [] = [];
  services = [
    {name: 'Cámaras'},
    {name: 'Cajón Techado'},
    {name: 'Departamento'},
    {name: 'Planta Baja'},
    {name: 'Estacionamiento Cerrado'},
    {name: 'Lugar en batería'},
  ];
  services1 = [
    'Cámaras',
    'Cajón Techado',
    'Departamento',
    'Planta Baja',
    'Estacionamiento Cerrado',
    'Lugar en batería',
  ];
  selected_parking: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private parking_Service: APIServiceService,
    private modalService: NgbModal,
  ) {
    this.loadParkings();

  }

  ngOnInit(): void {
    this.filterForm = this.filter_form_builder();
    this.amenitiesForm = this.fb.group({
      amenities: new FormArray(this.services.map(control => new FormControl(false, [Validators.required]))),
    });
  }

  go_to_add_Parking(){
    const navigationExtras : NavigationExtras = {
      state: {
        estatus: true
      }
    }
    this.router.navigate(['new'], navigationExtras)
  }


  get_Parking(id: string, parking: {}, content){
    this.selected_parking = id
    this.parking_Service.get_Parking(id).subscribe(parking => {
      this.current_parking = parking
    })

    const navigationExtras : NavigationExtras = {
      state: {
        id: id,
        parking: parking
      }
    }
    this.router.navigate(['parking-details'], navigationExtras)

    /* this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
		); */
  }

  async filter_parkings(filter, value){
    let filtrados = []
    await this.parking_Service.getParkings().subscribe(parkings => {
      this.filtered = parkings.filter(parking => parking[filter] === value)
      switch(filter){
        case 'Max Price':
          filtrados = parkings.filter(parking => parking['price'] >= value)
          this.go_to_filtered(filtrados)
        break;
        case 'Min Price':
          filtrados = parkings.filter(parking => parking['price'] <= value)
          this.go_to_filtered(filtrados)
        break;
        case 'amenities':
          let results: any = []
          let amenitiesList = this.amenitiesForm.value.amenities.map((checked, index) => checked ? this.services[index].name : null).filter(value => value !== null);
            for(const amenitie of amenitiesList) {
              results.push(parkings.filter(parking => parking['amenities'].includes(amenitie)))
            }
            console.log( results.flat())
            const resultsNewSet = new Set();
            for(const result of results.flat()) {
              resultsNewSet.add(result)
            }
            console.log(resultsNewSet.values())
          break;
        default:
          filtrados = parkings.filter(parking => parking[filter] == value)
          this.go_to_filtered(filtrados)
      }
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
      console.log('parkings', parkings);
      
      this.parkingList = parkings
    })
  }

  go_to_filtered(filtered_parkings){    
    let navigationExtras : NavigationExtras = {
      state: {
        list: filtered_parkings,
        filter: this.filterForm.value.filter,
        value: this.filterForm.value.value
      }
    }
    this.router.navigate(['filtered-parkings'], navigationExtras)
  }

  delete_Parking(parking_id: string){
    this.modalService.dismissAll();
    this.parking_Service.delete_parking(this.selected_parking).subscribe(result => {
      console.log('Result', result);
    })
  }
}
