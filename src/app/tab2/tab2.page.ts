import { Component } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { PopoverSettingsPage } from '../popover-settings/popover-settings.page';
import { CheckoutPage } from '../checkout/checkout.page';
import { DataserviceService } from '../services/dataservice.service';
import { format } from 'date-fns';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  today: string;
  orders: any;

  constructor( 
    public dataservice: DataserviceService,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public modalController: ModalController
    ) {
    this.get_orders();
  }

  ionViewWillEnter() {
    this.get_orders();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        {
          name: 'name2',
          type: 'date',
          id: 'name3-id',
        },
        // input date without min nor max
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log(name);
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  // async checkout(order_id, index){
  //   const now = new Date();
    
  //   this.today = now.toISOString();

  //   this.today = format(
  //     new Date(this.today),
  //     'yyyy-MM-dd'
  //   );

  //   console.log(this.today);
  //   var minutesToAdd=30;
  //   var currentDate = new Date();
  //   var futureDate = new Date(currentDate.getTime() + minutesToAdd*60000);
  //   // console.log(futureDate.toLocaleTimeString());


  //   const alert = await this.alertController.create({
  //     inputs: [
  //       {
  //         name: 'customer_number',
  //         type: 'text',
  //         placeholder: 'Customer Number'
  //       },
  //       {
  //         name: 'customer_address',
  //         type: 'text',
  //         placeholder: 'Customer Address'
  //       },
  //       {
  //         name: 'date',
  //         type: 'date',
  //         min: this.today,
  //       },],    
  //      buttons: [
  //           {
  //             text: 'Cancel',
  //             role: 'cancel',
  //             cssClass: 'secondary',
  //             handler: () => {
  //               console.log('Confirm Cancel');
  //             }
  //           }, {
  //             text: 'Ok',
  //             handler: async (alertData) => { //takes the data 
  //               await alert.present();
  //               console.log(alertData.date);

  //               this.dataservice.dataServe('check_out',{
  //                 order_id: order_id,
  //                 date: alertData.date + " " + futureDate.toLocaleTimeString(),
  //                 customer_number: alertData.customer_number,
  //                 customer_address: alertData.customer_address,
  //               }).subscribe((res:any)=>{
  //                 if(res.msg){
  //                   // console.log(res.data[0]['user_id']);
  //                   this.orders.splice(index, 1);
                    
  //                   console.log(res);
            
  //                 }
  //                 else{
  //                   this.orders = null;
  //                   console.log("No Data CHecked out");
  //                 }
                  
  //               })
  //               console.log(alertData.name1);
  //           }
  //           }
  //         ]
  // });
  // await alert.present();

  // }

  get_orders(){

    this.dataservice.dataServe('placed_orders',{
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

  async checkout(order_id, index) {
    window.sessionStorage.setItem('order_id', order_id);
    const modal = await this.modalController.create({ component: CheckoutPage });
    modal.onDidDismiss().then((data) => {
      this.get_orders();
    });

    return await modal.present();
  }

}
