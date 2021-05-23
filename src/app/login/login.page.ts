import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(    
    public dataservice: DataserviceService,
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
  }

  tryLogin(e){
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);

    this.dataservice.dataServe('login',{
      param1:e.target[0].value,
      param2:e.target[1].value
    }).subscribe((res:any)=>{
      if(res.data){
        // console.log(res.data[0]['user_id']);
        window.sessionStorage.setItem('user_id',res.data[0]['user_id']);
        window.sessionStorage.setItem('user_name',res.data[0]['user_name']);
        window.sessionStorage.setItem('user_address',res.data[0]['user_address']);
        window.sessionStorage.setItem('user_email',res.data[0]['user_email']);
        window.sessionStorage.setItem('user_number',res.data[0]['user_number']);
        
        this.presentToast('Welcome to Foodtrip!');
        this.router.navigate(['/tabs']);
      }
      else{
        this.presentToast("Username / Password is incorrect");
      }
      
    })

  }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'alert',
  //     message:'Welcome to Foodtrip!',
  //     backdropDismiss: true,
  //     translucent: false
  //   });

  //   await alert.present();

  //   const { role } = await alert.onDidDismiss();
  //   this.router.navigate(['/tabs']);
  //   this.presentToast()
  // }

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