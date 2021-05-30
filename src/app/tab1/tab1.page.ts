import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PopoverController } from '@ionic/angular';
import { PopoverSettingsPage } from '../popover-settings/popover-settings.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private router: Router, private _user: UserService,
    public popoverController: PopoverController
    ) {
      console.log("User id: ",window.sessionStorage.getItem('user_id'));
    }

    ngOnInit(): void {
      if(this._user.isLoggedIn()){
        this.router.navigate(['/tabs']);
      }
    }
  public getDish(category){
    window.sessionStorage.setItem('category', category);
    this.router.navigate(['view']);
  }

  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component: PopoverSettingsPage,
      cssClass: 'popOver',
      event: ev,
      mode: 'ios',
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
