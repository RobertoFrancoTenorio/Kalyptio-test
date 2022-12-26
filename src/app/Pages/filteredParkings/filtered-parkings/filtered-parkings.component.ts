import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { APIServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-filtered-parkings',
  templateUrl: './filtered-parkings.component.html',
  styleUrls: ['./filtered-parkings.component.scss']
})
export class FilteredParkingsComponent implements OnInit {
  parking_list: any = []
  current_parking: Object;
  closeResult: string = '';
  modalReference: any;
  filter_Param = '';
  value_param = '';
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private parking_Service: APIServiceService,
  ) {
    if(this.router.getCurrentNavigation().extras.state){
      let parkings = this.router.getCurrentNavigation().extras.state.list;

      for(let parking of parkings){
        this.parking_list.push(parking)
      }

      this.filter_Param = this.router.getCurrentNavigation().extras.state.filter.toUpperCase()
      this.value_param = this.router.getCurrentNavigation().extras.state.value
      console.log('queryparams', this.filter_Param);
      console.log('queryparams', this.value_param);

      console.log('parking', this.parking_list)
    }

    else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

  async get_Parking(id: string, content){
    console.log('Antes de hacer la consulta');

    await this.parking_Service.get_Parking(id).subscribe(parking => {
      this.current_parking = parking
      console.log('current parking', this.current_parking);
    })

    this.modalReference = this.modalService.open(content);

    console.log('despues de hacer la consulta');


  }

}
