import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-popover-settings',
  templateUrl: './popover-settings.page.html',
  styleUrls: ['./popover-settings.page.scss'],
})
export class PopoverSettingsPage implements OnInit {

  list: any = [
    "Profile",
  ]

  constructor(
    public popoverController: PopoverController,
    private _user: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  close(){
    this.popoverController.dismiss();
  }

   Logout(){
   this.popoverController.dismiss();
   this._user.setLogOut();  
   this._router.navigate(['login']); 
   }
}
