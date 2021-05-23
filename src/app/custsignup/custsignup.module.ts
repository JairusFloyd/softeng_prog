import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustsignupPageRoutingModule } from './custsignup-routing.module';

import { CustsignupPage } from './custsignup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustsignupPageRoutingModule
  ],
  declarations: [CustsignupPage]
})
export class CustsignupPageModule {}
