import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { join } from 'node:path';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
   private url: string = 'http://localhost/foodtrip_api/';

  constructor(private http: HttpClient) { }

  public dataServe (endpoint,data) {
    return this.http.post(this.url + endpoint,JSON.stringify(data));
    
  }
}
