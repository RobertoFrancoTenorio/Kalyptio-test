import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtered-parkings',
  templateUrl: './filtered-parkings.component.html',
  styleUrls: ['./filtered-parkings.component.scss']
})
export class FilteredParkingsComponent implements OnInit {

  constructor(
    private router: Router
  ) { 
    console.log('Query', this.router.getCurrentNavigation());
    if(this.router.getCurrentNavigation().extras.state){
      console.log('Lista', this.router.getCurrentNavigation().extras.state);
    }
    else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

}
