import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  orders: any;

  constructor( public dataservice: DataserviceService,public alertController: AlertController) {
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

  async checkout(order_id){
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'customer_number',
          type: 'text',
          placeholder: 'Customer Number'
        },
        {
          name: 'customer_address',
          type: 'text',
          placeholder: 'Customer Address'
        },],    
       buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: async (alertData) => { //takes the data 
                await alert.present();
                this.dataservice.dataServe('check_out',{
                  order_id: order_id,
                  customer_number: alertData.customer_number,
                  customer_address: alertData.customer_address,
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
                console.log(alertData.name1);
            }
            }
          ]
  });
  await alert.present();

  }

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

}
