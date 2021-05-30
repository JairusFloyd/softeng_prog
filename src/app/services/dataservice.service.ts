import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { join } from 'node:path';

@Injectable({ 
  providedIn: 'root'
})
export class DataserviceService {
  private url: string = 'http://localhost/foodtrip_api-revision/';

  public shareOtp : string = '';

  constructor(private http: HttpClient) { }

  public dataServe (endpoint,data) {
    return this.http.post(this.url + endpoint,JSON.stringify(data));
    
  }

  processData(endpoint, data) {
    return this.http.post(this.url + endpoint, JSON.stringify(data));
  }
  
  setOtp(data){
    this.shareOtp = data;
    }

  getOtp(){
    return this.shareOtp;
  }

}

