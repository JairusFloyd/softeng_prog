import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input('name') name: string;
  @Input('price') price:number;
  
  qty: number = 0;
  constructor(public dataservice: DataserviceService,public popoverController: PopoverController) {
    
   }

  ngOnInit() {
    console.log("name: ", this.name);
  }

  add(){
    this.qty += 1;
    console.log();
  }

  place(){
   console.log(this.qty);
   let customer_name = window.sessionStorage.getItem('user_name'); 
	 let customer_email = window.sessionStorage.getItem('user_email'); 
   let customer_address = window.sessionStorage.getItem('user_address'); 
   let customer_number = window.sessionStorage.getItem('user_number'); 
   let food_name = this.name;
   let qty = this.qty;
   let subtotal = this.qty * this.price;

   this.dataservice.dataServe('place_order',{
    customer_name,
    customer_email,
    customer_address,
    customer_number,
    food_name,
    qty,
    subtotal
  }).subscribe((res:any)=>{
    if(res.msg){
      this.popoverController.dismiss();
    }
    else{
      console.log(res);
    }
    
  })
  }

  minus(){
    if(this.qty != 0){
  
        this.qty -= 1;
        console.log();

    }
  }

}
