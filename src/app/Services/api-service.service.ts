import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  url = 'http://localhost:4000/api/parkings/';

  constructor(
    private http: HttpClient,
  ) { }

  getParkings(): Observable<any>{
    return this.http.get(this.url + 'get_parkings')
  }

  save_Parking(parking){
    return this.http.post(this.url, parking)
  }

  get_Parking(id: string){
    return this.http.get(this.url + id);
  }

  get_filtered_parkings(){
    console.log('get_FILTERED_parkings_SERVICE')
    return this.http.get(this.url + 'search_parking');
  }
}
