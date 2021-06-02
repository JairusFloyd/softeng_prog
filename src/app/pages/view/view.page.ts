import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { PopoverComponent } from '../../popover/popover.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})

export class ViewPage implements OnInit {

  dishes: any;
  title: string=window.sessionStorage.getItem('category');

  constructor(    
    public dataservice: DataserviceService,
    public popoverController: PopoverController,
    private router: Router,
) { }

  ngOnInit() {
    this.getDish();
  }

  public async presentPopover(name, price) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: { name, price },
      cssClass: 'my-custom-class',
      translucent: true,
    });
    await popover.present();

    const data = await popover.onWillDismiss();
    this.router.navigate(['tabs/Cart']);
  }

  public getDish(){
    this.dataservice.dataServe('get_dish',{
      food_category:window.sessionStorage.getItem('category')
    }).subscribe((res:any)=>{
      this.dishes = res.data;
    })
  }

}
