import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { format, isThursday } from 'date-fns';
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
  today;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public dataservice: DataserviceService,
    private _router: Router,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    console.log(window.sessionStorage.getItem('order_id'));
    const now = new Date();
    this.today = now.toISOString();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Time',
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

  // getMax(){
  //   if(this.customer_number > 11 || this.customer_number < 11){
  //     this.presentToast("Invalid phone number");
  //   }

  //   else{
  //   }
  // }

  dismiss() {
    this.modalController.dismiss();
  }

  checkout(){
    let date = format(
      new Date(this.date),
      'yyyy-MM-dd'
    );
    this.today = format(
      new Date(this.today),
      'yyyy-MM-dd'
    );

  // number.length(){
  //   if(this.customer_number.length() != 11){
  //       this.presentToast("Invalid phone number")
  //     }
  //   }
    // console.log("Today is: ", this.today);
    // console.log("Today is: ", date);

    if(this.today > date){
      this.presentToast("Date Selection Error");
    }

    // else if(this.customer_number.length() == 11){
    //   this.presentToast("Invalid phone number");
    // }

    else if(this.customer_address == false){
      this.presentToast("The address field is required");
    }

    else{
      let i = 0;
      let isNumber = true;
      // console.log(this.customer_number.length);
      
      if(this.customer_number.length < 11){
        this.presentToast("Invalid phone number");
        isNumber = false;
      }
      else if(this.customer_number.charAt(0) != '0' && this.customer_number.charAt(1) != '9'){
        this.presentToast("Invalid phone number");
        isNumber = false;
      }
      else{
        // this.presentToast("OK");
      for(i = 0; i < this.customer_number.length; i++){
        console.log("Index: "+ i + " = " + this.customer_number.charAt(i));
        if (this.customer_number.charAt(i) >= '0' && this.customer_number.charAt(i) <= '9') {
          console.log("number");
          isNumber = true;
        }
        else{
          console.log("not");
          isNumber = false;
          break;
        }
      }
    }
      console.log(isNumber);
      if(isNumber){
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
            console.log("No Data Checked out");
          }
          
        });
      }
      else{
        console.log("All fields required");
      }
      }
      else{
        this.presentToast("Invalid contact number format");
      }
     
    }  
  }

  isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      cssClass: 'toast-msg',
      message: msg,
      position: 'middle',
      duration: 800
    });
    toast.present();
  }

}
