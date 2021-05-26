import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DataserviceService } from '../services/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-custsignup',
  templateUrl: './custsignup.page.html',
  styleUrls: ['./custsignup.page.scss'],
})
export class CustsignupPage implements OnInit {

  today;
  content:string;
  rString:string;
  result:string;

  constructor(
    public dataservice: DataserviceService,
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router
    ) {
      this.today = new Date().toISOString;
     }

  ngOnInit() {
  }

  trySubmit(e){
    e.preventDefault();
    console.log(e);
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    console.log(e.target[2].value);
    console.log(e.target[3].value);

    
  //let gender    = e.target[2].value;
    //let birthday  = e.target[3].value;
    //let address   = e.target[4].value;
     //let mobileno  = e.target[7].value;

   
    let email = e.target[1].value;
    let username  = e.target[0].value;
    let pass  = e.target[2].value;
    let cpassword = e.target[3].value;

    if (pass == cpassword) {
  
    this.dataservice.processData('register', {username,  pass, email}).subscribe((res: any)=>{
      this.result = res.result;
      console.log(res.result);
      console.log(this.result);
    
      if( this.result == "1"){
        Swal.fire({
            icon : 'success',
            title: 'Register!',
            confirmButtonText: 'Continue'
          });
       
          this.Mailer(e);
          this.router.navigate(['otp']);
      }
       
      if(this.result=="0"){
    Swal.fire({
        icon : 'error',
        title: 'Account Already Existed!',
        confirmButtonText: 'Continue'
      });
      this.router.navigate(['register']);
  
      }
    });
  }
    else {
      Swal.fire({
        icon : 'error',
        title: 'Password Does Not Match!',
        confirmButtonText: 'Continue'
      });
      this.router.navigate(['register']);
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
  randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

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

    Mailer(e) {
    e.preventDefault();
    console.log(e);
  
  
    this.rString = this.randomString(6, '0123456789');
    this.dataservice.setOtp( this.rString );
    console.log(this.rString);
    this.content = "Hi there "+
    "<br>"+
    "We just want to make sure this is really you! "+
    "<br>"+
    "Please enter this security code in your Foodtrip application: "+
    "<br>"+
    "<b>"+this.rString+"</b>";
    let body = this.content;
    let subj = "Email Verification Code"
  //let gender    = e.target[2].value;
    //let birthday  = e.target[3].value;
    //let address   = e.target[4].value;
    //let mobileno  = e.target[7].value;

  
    let email     = e.target[1].value;

    
    this.dataservice.processData('mailer', {email,body,subj}).subscribe((res: any)=>{

    });
  }

}

