import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DataserviceService } from '../services/dataservice.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
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
    private _user: UserService,
    private _router: Router,
    
    private router: Router) { }

  ngOnInit() {
    if(this._user.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  ionViewWillEnter() {
    if(this._user.isLoggedIn()) {
      this._router.navigate(['/tabs']);
    }
  }

  /*tryLogin(e) {
    e.preventDefault();
    console.log(e);
    console.log(e.target[0].value);
    console.log(e.target[1].value);

    let param1 = e.target[0].value;
    let param2 = e.target[1].value;
  
    
  
    this.dataservice.processData('login', { param1, param2 }).subscribe((res: any)=>{
      console.log(res.data);
  // console.log(res.data[0]['user_id']);

    // console.log(res.data[0]['user_id']);
    //window.sessionStorage.setItem('user_id',res.data[0]['user_id']);
    //window.sessionStorage.setItem('user_name',res.data[0]['user_name']);
    window.sessionStorage.setItem('user_name',param1);
    //window.sessionStorage.setItem('user_address',res.result[0]['user_address']);
    //window.sessionStorage.setItem('user_email',res.data[0]['user_email']);
    //window.sessionStorage.setItem('user_number',res.result[0]['user_number']);
    

      if(res.result == "0"){
       
        
        Swal.fire({
          icon : 'success',
          title: 'Successfuly log in!',
          confirmButtonText: 'Confirm'
        });
  
           this._user.setLogIn();      this._router.navigate(['/tabs']);
          }

        else{
     
          Swal.fire({
            icon : 'error',
            title: 'Incorrect username or password!',
            confirmButtonText: 'Confirm'
          });
          this._router.navigate(['login']);
        }

     });
  
    
    
  
      }

*/
  tryLogin(e){
    
    
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);

    this.dataservice.dataServe('login',{
      param1:e.target[0].value,
      param2:e.target[1].value
    }).subscribe((res:any)=>{
      if(res.data){
        // alert(res.data[0]['user_id']);
        
        window.sessionStorage.setItem('user_id',res.data[0]['user_id']);
        window.sessionStorage.setItem('user_name',res.data[0]['user_name']);
        window.sessionStorage.setItem('user_address',res.data[0]['user_address']);
        window.sessionStorage.setItem('user_email',res.data[0]['user_email']);
        window.sessionStorage.setItem('user_number',res.data[0]['user_number']);
        
        this.presentToast('Welcome to Foodtrip!');
        this._user.setLogIn();  
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