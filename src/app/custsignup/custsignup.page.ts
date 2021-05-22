import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

    this.dataservice.dataServe('register',{
      user_name:e.target[0].value,
      user_email:e.target[1].value,
      user_password:e.target[2].value
    }).subscribe((res:any)=>{
      this.presentAlert();
      console.log(res);
    })
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.router.navigate(['/login']);
  }
}
