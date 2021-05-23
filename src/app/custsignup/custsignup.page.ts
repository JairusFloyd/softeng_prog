import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-custsignup',
  templateUrl: './custsignup.page.html',
  styleUrls: ['./custsignup.page.scss'],
})
export class CustsignupPage implements OnInit {

  constructor(
    public dataservice: DataserviceService,
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  trySubmit(e){
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    console.log(e.target[2].value);
    console.log(e.target[3].value);

    if (e.target[2].value == e.target[3].value){
      this.dataservice.dataServe('register',{
        user_name:e.target[0].value,
        user_email:e.target[1].value,
        user_password:e.target[2].value
      }).subscribe((res:any)=>{
        this.presentAlert();
        console.log(res);
      })
    }

    else {
      this.presentToast();
    }

    // this.dataservice.dataServe('register',{
    //   user_name:e.target[0].value,
    //   user_email:e.target[1].value,
    //   user_password:e.target[2].value
    // }).subscribe((res:any)=>{
    //   this.presentAlert();
    //   console.log(res);
    // })
    
  }

  // async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: 'The username/password is incorrect',
  //     duration: 2000
  //   });
  //   toast.present();
  // }

  async presentAlert(){
    const alert = await this.alertController.create({
      cssClass: 'alert',
      // header: 'Alert',
      subHeader: 'Registered Sucessfully!',
      // message: 'Register Sucessfully!',
      buttons: ['Ok']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.router.navigate(['/login']);
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      cssClass: 'toast-msg',
      message: 'The password does not match',
      duration: 2000
    });
    toast.present();
  }
}

