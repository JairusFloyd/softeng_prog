import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverSettingsPage } from '../popover-settings/popover-settings.page';
import { DataserviceService } from '../services/dataservice.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  orders: any;

  constructor( 
    public dataservice: DataserviceService,
    public popoverController: PopoverController
    ) {
    this.get_orders();
  }

  ionViewWillEnter() {
    this.get_orders();
  }

  cancel(order_id){
    // alert(order_id);
    this.dataservice.dataServe('cancel',{
      order_id: order_id
    }).subscribe((res:any)=>{
      if(res.msg){
        // console.log(res.data[0]['user_id']);
  
        console.log(res);

      }
      else{
        this.orders = null;
        console.log("No Data CHecked out");
      }
      
    })

  }

  get_orders(){

    this.dataservice.dataServe('checked_out',{
      customer_email: window.sessionStorage.getItem('user_email')
    }).subscribe((res:any)=>{
      if(res.data){
        // console.log(res.data[0]['user_id']);
  
        this.orders = res.data;
        console.log(this.orders);

      }
      else{
        this.orders = null;
        console.log("No Data Found");
      }
      
    })

  }

  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component: PopoverSettingsPage,
      cssClass: 'popOver',
      event: ev,
      mode: 'ios',
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
