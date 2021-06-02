import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(
    private _ds: DataserviceService,
    private _router: Router) { }

    Otp:string;
  Otp_to_add = '';
  ngOnInit(): void { 
    
    this.Otp = this._ds.getOtp();
  }

  Validate(e){
    e.preventDefault();
    console.log(e);
    console.log(e.target[0].value);
 
    let Otp = e.target[0].value;

    if(this.Otp ==Otp){
       
      Swal.fire({
        icon : 'success',
        title: 'Successfully Validated!',
        confirmButtonText: 'Confirm'
        
      });
      this._router.navigate(['login']);
    }
      
      else{
   
        Swal.fire({
          icon : 'error',
          title: '"Invalid Code!"',
          confirmButtonText: 'Confirm'
        });
        this._router.navigate(['otp']);
      }
  }
}