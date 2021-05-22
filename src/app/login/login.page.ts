import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    this.router.navigate(['/tabs']);
  }
}
