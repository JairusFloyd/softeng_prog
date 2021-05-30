import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  date: any;
  customer_number: any;
  customer_address: any;
  time: string;
  constructor(public modalController: ModalController,public alertController: AlertController,public dataservice: DataserviceService,private _router: Router) { }

  ngOnInit() {
    console.log(window.sessionStorage.getItem('order_id'));
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: '9am - 10am',
          value: '9am - 10am',
          handler: () => {
            console.log('Radio 1 selected');
          },
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: '10am - 11am',
          value: '10am - 11am',
          handler: () => {
            console.log('Radio 2 selected');
          }
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '11am - 12pm',
          value: '11am - 12pm',
          handler: () => {
            console.log('Radio 3 selected');
          }
        },
        {
          name: 'radio4',
          type: 'radio',
          label: '12pm - 1pm',
          value: '12pm - 1pm',
          handler: () => {
            console.log('Radio 4 selected');
          }
        },
        {
          name: 'radio5',
          type: 'radio',
          label: '1pm - 2pm',
          value: '1pm - 2pm',
          handler: () => {
            console.log('Radio 5 selected');
          }
        },
        {
          name: 'radio6',
          type: 'radio',
          label: '2pm - 3pm',
          value: '2pm - 3pm',
          handler: () => {
            console.log('Radio 6 selected');
          }
        },
        {
          name: 'radio7',
          type: 'radio',
          label: '3pm - 4pm',
          value: '3pm - 4pm',
          handler: () => {
            console.log('Radio 7 selected');
          }
        },
        {
          name: 'radio8',
          type: 'radio',
          label: '4pm - 5pm',
          value: '4pm - 5pm',
          handler: () => {
            console.log('Radio 8 selected');
          }
        },
        {
          name: 'radio9',
          type: 'radio',
          label: '5pm - 6pm',
          value: '5pm - 6pm',
          handler: () => {
            console.log('Radio 9 selected');
          }
        },
        {
          name: 'radio10',
          type: 'radio',
          label: '6pm - 7pm',
          value: '6pm - 7pm',
          handler: () => {
            console.log('Radio 10 selected');
          }
        }
      ],
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
          handler: (data) => {
            this.time = data;
            // console.log('OK clicked. Data -> ' + JSON.stringify(data));
          }
        }
      ]
    });

    await alert.present();
  }


  dismiss() {
    this.modalController.dismiss();
  }

  checkout(){
    if(this.date && this.customer_address && this.customer_number && this.time){
      this.date = format(
        new Date(this.date),
        'yyyy-MM-dd'
      );

      this.date = this.date + " " + this.time;
      console.log(this.date);
      this.dataservice.dataServe('check_out',{
        user_id: window.sessionStorage.getItem('user_id'),
        user_email: window.sessionStorage.getItem('user_email'),
        order_id: window.sessionStorage.getItem('order_id'),
        date: this.date,
        customer_number: this.customer_number,
        customer_address: this.customer_address,
      }).subscribe((res:any)=>{
        if(res.msg == "Successfully Checked out"){
          this.dismiss();
  
        }
        else{
          console.log("No Data CHecked out");
        }
        
      });
    }
    else{
      console.log("All fields required");
    }
    
  


  }
}
