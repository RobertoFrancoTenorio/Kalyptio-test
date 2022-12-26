import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIServiceService } from 'src/app/Services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.component.html',
  styleUrls: ['./parking-details.component.scss']
})
export class ParkingDetailsComponent implements OnInit {
  id: string = '';
  current_parking: {} = {};
  constructor(
    private router: Router,
    private parking_Service: APIServiceService,
  ) {
    if(!this.router.getCurrentNavigation().extras.state){
      this.router.navigate([''])
      
    } else {      
      console.log('id', this.router.getCurrentNavigation().extras.state);
      this.id = this.router.getCurrentNavigation().extras.state.id
      this.current_parking = this.router.getCurrentNavigation().extras.state.parking
    } 
   }

  ngOnInit(): void {
  }

  delete_parking(){
    Swal.fire({
      icon: 'question',
      title: 'Do you want delete this parking?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.parking_Service.delete_parking(this.id).subscribe(data => {
          console.log('data', data);
          this.router.navigate([''])
        })
      } else if (result.isDenied) {
        Swal.close()
      }
    })
    console.log("delete_parking", this.current_parking['address']);
    
  }

  go_to_home(){
    this.router.navigate([''])
  }

}
